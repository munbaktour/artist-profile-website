import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET: 메시지 발송 내역 조회
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

    // 발송 내역 조회
    const { data: logs, error } = await supabase
      .from('message_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100)

    if (error) {
      console.error('Error fetching message logs:', error)
      return NextResponse.json(
        { error: '발송 내역을 불러오는데 실패했습니다.' },
        { status: 500 }
      )
    }

    // 통계 계산
    const stats = {
      total: logs.length,
      sent: logs.filter(l => l.status === 'sent').length,
      failed: logs.filter(l => l.status === 'failed').length,
    }

    return NextResponse.json({
      data: logs,
      stats,
    })
  } catch (error) {
    console.error('Error in messages API:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
