import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

/**
 * 발송 내역을 읽는다.
 *
 * 이전에는 message_logs를 조회했는데 그런 테이블이 없다. PostgREST가 404를 돌려주고
 * 화면은 "발송 내역이 없습니다"만 보여줬다. 실제로 쓰는 테이블은 notification_logs다
 * (발송 쪽 saveNotificationLog가 거기에 쓴다).
 *
 * 칼럼 이름이 화면이 기대하는 것과 달라 여기서 맞춰 보낸다.
 */

// provider_response의 모양은 보낸 곳마다 다르다.
//   Resend(메일)  { successCount, failCount }
//   NHN(알림톡)   { message: { sendResults: [...] } }
interface Recipient {
  id?: string
  name?: string
  to?: string
}

interface ProviderResponse {
  successCount?: number
  failCount?: number
  message?: { sendResults?: unknown[] }
}

export async function GET() {
  try {
    const supabase = await createClient()

    // 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      )
    }

    const { data: logs, error } = await supabase
      .from('notification_logs')
      .select('id, notification_type, channel, subject, content, status, provider_response, recipients, recipient_phone, created_at')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Error fetching notification logs:', error)
      return NextResponse.json(
        { error: '발송 내역을 불러오는데 실패했습니다.' },
        { status: 500 }
      )
    }

    const rows = logs ?? []

    const data = rows.map(log => {
      // 수신자 수를 따로 저장하는 칼럼이 없다. 발송 결과에 남은 건수로 복원한다.
      // 어느 모양으로도 셀 수 없는 옛 기록은 최소 1명으로 둔다.
      const result = (log.provider_response ?? null) as ProviderResponse | null
      const counted =
        (result?.successCount ?? 0) + (result?.failCount ?? 0) ||
        (result?.message?.sendResults?.length ?? 0)

      // 2026-10-01 이전 기록에는 recipients가 없다. 그때는 수신자를 recipient_phone
      // 한 칸에만 넣었고, 여러 명이면 "2명"이라는 글자로 뭉개 저장했다 — 그 기록은
      // 누구에게 보냈는지 복원할 방법이 없다. 남아 있는 값이라도 그대로 보여준다.
      const stored = (log.recipients ?? null) as Recipient[] | null
      const recipients =
        stored && stored.length > 0
          ? stored
          : log.recipient_phone
            ? [{ name: undefined, to: String(log.recipient_phone) }]
            : []

      return {
        id: log.id,
        recipients,
        template_id: log.notification_type,
        channel: log.channel,
        subject: log.subject,
        content: log.content,
        status: log.status,
        recipient_count: counted > 0 ? counted : 1,
        created_at: log.created_at,
      }
    })

    const stats = {
      total: data.length,
      sent: data.filter(l => l.status === 'sent').length,
      failed: data.filter(l => l.status === 'failed').length,
    }

    return NextResponse.json({ data, stats })
  } catch (error) {
    console.error('Error in messages API:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
