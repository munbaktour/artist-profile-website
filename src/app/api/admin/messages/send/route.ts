import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// NHN Cloud 카카오 브랜드 메시지 API 엔드포인트
// API 문서: https://docs.nhncloud.com/ko/Notification/KakaoTalk%20Bizmessage/ko/friendtalkupgrade-api-guide/
const NHN_BRAND_MESSAGE_API = 'https://api-alimtalk.cloud.toast.com/brand-message/v1.0/appkeys'

// 메시지 타입
type ChatBubbleType = 'TEXT' | 'IMAGE' | 'WIDE_IMAGE' | 'WIDE_ITEMLIST'

// 타겟팅 타입
// M: 마케팅 수신동의 유저 (채널 친구 여부 무관)
// N: 채널 친구가 아닌 마케팅 수신동의 유저만
// I: 채널 친구인 유저만
type TargetingType = 'M' | 'N' | 'I'

interface SendRequest {
  recipientIds: string[] // contact IDs
  content: string
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
      content,
      imageUrl,
      buttonText,
      buttonLink,
      targeting = 'M', // 기본값: 마케팅 수신동의 유저 전체
      chatBubbleType = 'TEXT', // 기본값: 텍스트형
    } = body

    if (!recipientIds || recipientIds.length === 0) {
      return NextResponse.json(
        { error: '발송 대상을 선택해주세요.' },
        { status: 400 }
      )
    }

    if (!content) {
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

    // 수신자 목록 생성
    const recipients: BrandMessageRecipient[] = validContacts.map(contact => ({
      recipientNo: (contact.phone || contact.mobile).replace(/[^0-9]/g, ''),
      targeting,
    }))

    // 버튼 구성 (있을 경우, 최대 5개)
    const buttons = buttonText && buttonLink ? [{
      ordering: 1,
      type: 'WL', // 웹 링크
      name: buttonText,
      linkMo: buttonLink,
      linkPc: buttonLink,
    }] : undefined

    // 요청 본문 구성
    const requestBody: Record<string, unknown> = {
      senderKey,
      chatBubbleType,
      content,
      recipientList: recipients,
      pushAlarm: true, // 푸시 알람 발송
    }

    // 이미지가 있으면 IMAGE 타입으로 변경
    if (imageUrl && chatBubbleType === 'TEXT') {
      requestBody.chatBubbleType = 'IMAGE'
      requestBody.imageUrl = imageUrl
    } else if (imageUrl) {
      requestBody.imageUrl = imageUrl
    }

    // 버튼 추가
    if (buttons) {
      requestBody.buttons = buttons
    }

    // NHN Cloud 브랜드 메시지 API 호출
    const brandMessageResponse = await fetch(
      `${NHN_BRAND_MESSAGE_API}/${appKey}/freestyle-messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Secret-Key': secretKey,
        },
        body: JSON.stringify(requestBody),
      }
    )

    const brandMessageResult = await brandMessageResponse.json()

    // 발송 결과 로그 저장
    const { error: logError } = await supabase
      .from('message_logs')
      .insert({
        template_id: 'brand-message', // 브랜드 메시지
        content,
        recipient_count: validContacts.length,
        recipient_ids: recipientIds,
        status: brandMessageResult.header?.isSuccessful ? 'sent' : 'failed',
        response: brandMessageResult,
        sent_by: user.id,
      })

    if (logError) {
      console.error('Error saving message log:', logError)
      // 로그 저장 실패해도 발송 결과는 반환
    }

    if (!brandMessageResult.header?.isSuccessful) {
      console.error('Brand Message API error:', brandMessageResult)
      return NextResponse.json(
        {
          error: '메시지 발송에 실패했습니다.',
          detail: brandMessageResult.header?.resultMessage || 'Unknown error',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      sentCount: validContacts.length,
      requestId: brandMessageResult.message?.requestId,
    })

  } catch (error) {
    console.error('Error in message send API:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
