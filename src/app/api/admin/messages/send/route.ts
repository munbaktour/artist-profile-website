import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// NHN Cloud API 엔드포인트
const NHN_ALIMTALK_API = 'https://api-alimtalk.cloud.toast.com/alimtalk/v2.3/appkeys'
const NHN_BRAND_MESSAGE_API = 'https://api-alimtalk.cloud.toast.com/brand-message/v1.0/appkeys'

// 메시지 타입
type MessageType = 'alimtalk' | 'brandmessage'
type ChatBubbleType = 'TEXT' | 'IMAGE' | 'WIDE_IMAGE' | 'WIDE_ITEMLIST'

// 타겟팅 타입 (브랜드 메시지용)
// M: 마케팅 수신동의 유저 (채널 친구 여부 무관)
// N: 채널 친구가 아닌 마케팅 수신동의 유저만
// I: 채널 친구인 유저만
type TargetingType = 'M' | 'N' | 'I'

interface SendRequest {
  recipientIds: string[] // contact IDs
  messageType: MessageType
  // 알림톡용
  templateCode?: string
  templateVariables?: Record<string, string>
  // 브랜드 메시지용
  content?: string
  imageUrl?: string
  buttonText?: string
  buttonLink?: string
  targeting?: TargetingType
  chatBubbleType?: ChatBubbleType
}

interface BrandMessageRecipient {
  recipientNo: string
  targeting?: TargetingType
}

interface AlimtalkRecipient {
  recipientNo: string
  templateParameter?: Record<string, string>
}

export async function POST(request: NextRequest) {
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

    // 환경변수 확인
    const appKey = process.env.NHN_CLOUD_APPKEY
    const secretKey = process.env.NHN_CLOUD_SECRET_KEY
    const senderKey = process.env.NHN_CLOUD_SENDER_KEY

    if (!appKey || !secretKey || !senderKey) {
      console.error('NHN Cloud credentials not configured')
      return NextResponse.json(
        { error: 'NHN Cloud 설정이 완료되지 않았습니다.' },
        { status: 500 }
      )
    }

    const body: SendRequest = await request.json()
    const {
      recipientIds,
      messageType = 'alimtalk',
      // 알림톡용
      templateCode,
      templateVariables,
      // 브랜드 메시지용
      content,
      imageUrl,
      buttonText,
      buttonLink,
      targeting = 'M',
      chatBubbleType = 'TEXT',
    } = body

    if (!recipientIds || recipientIds.length === 0) {
      return NextResponse.json(
        { error: '발송 대상을 선택해주세요.' },
        { status: 400 }
      )
    }

    // 메시지 타입별 유효성 검사
    if (messageType === 'alimtalk' && !templateCode) {
      return NextResponse.json(
        { error: '템플릿을 선택해주세요.' },
        { status: 400 }
      )
    }

    if (messageType === 'brandmessage' && !content) {
      return NextResponse.json(
        { error: '메시지 내용을 입력해주세요.' },
        { status: 400 }
      )
    }

    // 연락처에서 전화번호 조회
    const { data: contacts, error: contactsError } = await supabase
      .from('contacts')
      .select('id, name, phone, mobile')
      .in('id', recipientIds)

    if (contactsError) {
      console.error('Error fetching contacts:', contactsError)
      return NextResponse.json(
        { error: '연락처 조회에 실패했습니다.' },
        { status: 500 }
      )
    }

    // 전화번호가 있는 연락처만 필터링
    const validContacts = contacts.filter(c => c.phone || c.mobile)

    if (validContacts.length === 0) {
      return NextResponse.json(
        { error: '전화번호가 등록된 연락처가 없습니다.' },
        { status: 400 }
      )
    }

    let apiResponse: Response
    let apiResult: { header?: { isSuccessful?: boolean; resultMessage?: string }; message?: { requestId?: string } }
    let logContent: string

    if (messageType === 'alimtalk') {
      // ============ 알림톡 발송 ============
      const alimtalkRecipients: AlimtalkRecipient[] = validContacts.map(contact => ({
        recipientNo: (contact.phone || contact.mobile).replace(/[^0-9]/g, ''),
        templateParameter: templateVariables || {},
      }))

      const alimtalkBody = {
        senderKey,
        templateCode,
        recipientList: alimtalkRecipients,
      }

      console.log('Alimtalk request:', JSON.stringify(alimtalkBody, null, 2))

      apiResponse = await fetch(
        `${NHN_ALIMTALK_API}/${appKey}/messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Secret-Key': secretKey,
          },
          body: JSON.stringify(alimtalkBody),
        }
      )

      apiResult = await apiResponse.json()
      logContent = `[알림톡] 템플릿: ${templateCode}`

    } else {
      // ============ 브랜드 메시지 발송 ============
      const brandRecipients: BrandMessageRecipient[] = validContacts.map(contact => ({
        recipientNo: (contact.phone || contact.mobile).replace(/[^0-9]/g, ''),
        targeting,
      }))

      // 버튼 구성 (있을 경우, 최대 5개)
      const buttons = buttonText && buttonLink ? [{
        ordering: 1,
        type: 'WL',
        name: buttonText,
        linkMo: buttonLink,
        linkPc: buttonLink,
      }] : undefined

      const brandMessageBody: Record<string, unknown> = {
        senderKey,
        chatBubbleType,
        content,
        recipientList: brandRecipients,
        pushAlarm: true,
      }

      // 이미지가 있으면 IMAGE 타입으로 변경
      if (imageUrl && chatBubbleType === 'TEXT') {
        brandMessageBody.chatBubbleType = 'IMAGE'
        brandMessageBody.imageUrl = imageUrl
      } else if (imageUrl) {
        brandMessageBody.imageUrl = imageUrl
      }

      // 버튼 추가
      if (buttons) {
        brandMessageBody.buttons = buttons
      }

      console.log('Brand message request:', JSON.stringify(brandMessageBody, null, 2))

      apiResponse = await fetch(
        `${NHN_BRAND_MESSAGE_API}/${appKey}/freestyle-messages`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'X-Secret-Key': secretKey,
          },
          body: JSON.stringify(brandMessageBody),
        }
      )

      apiResult = await apiResponse.json()
      logContent = content || ''
    }

    console.log('API response:', JSON.stringify(apiResult, null, 2))

    // 발송 결과 로그 저장
    const { error: logError } = await supabase
      .from('message_logs')
      .insert({
        template_id: messageType === 'alimtalk' ? templateCode : 'brand-message',
        content: logContent,
        recipient_count: validContacts.length,
        recipient_ids: recipientIds,
        status: apiResult.header?.isSuccessful ? 'sent' : 'failed',
        response: apiResult,
        sent_by: user.id,
      })

    if (logError) {
      console.error('Error saving message log:', logError)
    }

    if (!apiResult.header?.isSuccessful) {
      console.error('API error:', apiResult)
      return NextResponse.json(
        {
          error: '메시지 발송에 실패했습니다.',
          detail: apiResult.header?.resultMessage || 'Unknown error',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      sentCount: validContacts.length,
      requestId: apiResult.message?.requestId,
    })

  } catch (error) {
    console.error('Error in message send API:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
