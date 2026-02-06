import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// NHN Cloud API 엔드포인트
const NHN_ALIMTALK_API = 'https://api-alimtalk.cloud.toast.com/alimtalk/v2.3/appkeys'
const NHN_BRAND_MESSAGE_API = 'https://api-alimtalk.cloud.toast.com/brand-message/v1.0/appkeys'
const NHN_SMS_API = 'https://api-sms.cloud.toast.com/sms/v3.0/appKeys'

// 메시지 타입
type MessageType = 'alimtalk' | 'brandmessage' | 'sms' | 'kakao_sms'
type ChatBubbleType = 'TEXT' | 'IMAGE' | 'WIDE_IMAGE' | 'WIDE_ITEMLIST'

// 타겟팅 타입 (브랜드 메시지용)
type TargetingType = 'M' | 'N' | 'I'

// 변수 모드: 1명 선택 시 직접 입력, 2명 이상 선택 시 자동 치환
type VariableMode = 'manual' | 'auto'

interface SendRequest {
  recipientIds: string[]
  messageType: MessageType
  // 알림톡용
  templateCode?: string
  commonVariables?: Record<string, string>
  // 변수 모드: manual (1명 직접 입력) / auto (2명 이상 자동 치환)
  variableMode?: VariableMode
  // 개별 변수 (1명 선택 시 직접 입력)
  individualVariables?: Record<string, string>
  // 브랜드 메시지용
  content?: string
  imageUrl?: string
  buttonText?: string
  buttonLink?: string
  targeting?: TargetingType
  chatBubbleType?: ChatBubbleType
  // SMS 대체 발송
  fallbackToSms?: boolean
}

interface BrandMessageRecipient {
  recipientNo: string
  targeting?: TargetingType
}

interface AlimtalkRecipient {
  recipientNo: string
  templateParameter: Record<string, string>
}

interface SmsRecipient {
  recipientNo: string
}

interface Contact {
  id: string
  name: string
  phone: string | null
  mobile: string | null
}

interface FailedRecipient {
  name: string
  phone: string
  reason: string
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
    const smsAppKey = process.env.NHN_CLOUD_SMS_APPKEY || appKey
    const smsSecretKey = process.env.NHN_CLOUD_SMS_SECRET_KEY || secretKey
    const smsSendNo = process.env.NHN_CLOUD_SMS_SENDER_NO // 발신번호

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
      templateCode,
      commonVariables = {},
      variableMode = 'auto', // 기본값: 자동 치환
      individualVariables = {},
      content,
      imageUrl,
      buttonText,
      buttonLink,
      targeting = 'M',
      chatBubbleType = 'TEXT',
      fallbackToSms = false,
    } = body

    if (!recipientIds || recipientIds.length === 0) {
      return NextResponse.json(
        { error: '발송 대상을 선택해주세요.' },
        { status: 400 }
      )
    }

    // 메시지 타입별 유효성 검사
    if ((messageType === 'alimtalk' || messageType === 'kakao_sms') && !templateCode) {
      return NextResponse.json(
        { error: '템플릿을 선택해주세요.' },
        { status: 400 }
      )
    }

    if ((messageType === 'brandmessage' || messageType === 'sms') && !content) {
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
    const validContacts = (contacts as Contact[]).filter(c => c.phone || c.mobile)

    if (validContacts.length === 0) {
      return NextResponse.json(
        { error: '전화번호가 등록된 연락처가 없습니다.' },
        { status: 400 }
      )
    }

    let successCount = 0
    let failCount = 0
    const failedRecipients: FailedRecipient[] = []
    let requestId: string | undefined

    // ============ 알림톡 발송 ============
    if (messageType === 'alimtalk' || messageType === 'kakao_sms') {
      // 디버깅: variableMode 및 연락처 정보 확인
      console.log('=== Alimtalk Debug Info ===')
      console.log('variableMode:', variableMode)
      console.log('validContacts count:', validContacts.length)
      console.log('validContacts sample:', validContacts.slice(0, 3).map(c => ({ id: c.id, name: c.name, phone: c.phone })))

      // 변수 모드에 따라 templateParameter 생성
      const alimtalkRecipients: AlimtalkRecipient[] = validContacts.map(contact => {
        const phoneNo = (contact.phone || contact.mobile || '').replace(/[^0-9]/g, '')

        let templateParameter: Record<string, string>

        if (variableMode === 'manual') {
          // 1명 선택: 사용자가 직접 입력한 개별 변수 사용
          templateParameter = {
            ...commonVariables,
            ...individualVariables,
          }
        } else {
          // 2명 이상: DB에서 자동 치환
          // contact.name이 빈 문자열이거나 공백만 있는 경우 '고객'으로 대체
          const customerName = (contact.name || '').trim() || '고객'
          templateParameter = {
            ...commonVariables,
            '고객명': customerName,
            '전화번호': phoneNo,
          }
        }

        return {
          recipientNo: phoneNo,
          templateParameter,
        }
      })

      const alimtalkBody = {
        senderKey,
        templateCode,
        recipientList: alimtalkRecipients,
      }

      console.log('Alimtalk request:', JSON.stringify(alimtalkBody, null, 2))

      const apiResponse = await fetch(
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

      const apiResult = await apiResponse.json()
      console.log('Alimtalk response:', JSON.stringify(apiResult, null, 2))

      if (apiResult.header?.isSuccessful) {
        successCount = validContacts.length
        requestId = apiResult.message?.requestId

        // 개별 발송 결과 확인
        if (apiResult.message?.sendResults) {
          successCount = 0
          for (const result of apiResult.message.sendResults) {
            if (result.isSuccessful) {
              successCount++
            } else {
              failCount++
              const contact = validContacts.find(c =>
                (c.phone || c.mobile || '').replace(/[^0-9]/g, '') === result.recipientNo
              )
              failedRecipients.push({
                name: contact?.name || '',
                phone: result.recipientNo,
                reason: result.resultMessage || '발송 실패',
              })
            }
          }
        }
      } else {
        // 전체 실패
        failCount = validContacts.length
        failedRecipients.push({
          name: '전체',
          phone: '',
          reason: apiResult.header?.resultMessage || '알림톡 발송 실패',
        })

        // SMS 대체 발송
        if (fallbackToSms && content && smsSendNo) {
          console.log('Fallback to SMS...')
          const smsResult = await sendSms(
            smsAppKey,
            smsSecretKey,
            smsSendNo,
            validContacts,
            content
          )
          if (smsResult.success) {
            successCount = smsResult.successCount
            failCount = smsResult.failCount
            failedRecipients.length = 0
            if (smsResult.failedRecipients) {
              failedRecipients.push(...smsResult.failedRecipients)
            }
          }
        }
      }

      // 로그 저장
      await saveMessageLog(supabase, {
        templateId: templateCode || '',
        content: `[알림톡] 템플릿: ${templateCode}`,
        recipientCount: validContacts.length,
        recipientIds,
        status: successCount > 0 ? 'sent' : 'failed',
        response: apiResult,
        sentBy: user.id,
      })
    }

    // ============ 브랜드 메시지 발송 ============
    else if (messageType === 'brandmessage') {
      const brandRecipients: BrandMessageRecipient[] = validContacts.map(contact => ({
        recipientNo: (contact.phone || contact.mobile || '').replace(/[^0-9]/g, ''),
        targeting,
      }))

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

      if (imageUrl && chatBubbleType === 'TEXT') {
        brandMessageBody.chatBubbleType = 'IMAGE'
        brandMessageBody.imageUrl = imageUrl
      } else if (imageUrl) {
        brandMessageBody.imageUrl = imageUrl
      }

      if (buttons) {
        brandMessageBody.buttons = buttons
      }

      console.log('Brand message request:', JSON.stringify(brandMessageBody, null, 2))

      const apiResponse = await fetch(
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

      const apiResult = await apiResponse.json()
      console.log('Brand message response:', JSON.stringify(apiResult, null, 2))

      if (apiResult.header?.isSuccessful) {
        successCount = validContacts.length
        requestId = apiResult.message?.requestId
      } else {
        failCount = validContacts.length
        failedRecipients.push({
          name: '전체',
          phone: '',
          reason: apiResult.header?.resultMessage || '브랜드 메시지 발송 실패',
        })
      }

      await saveMessageLog(supabase, {
        templateId: 'brand-message',
        content: content || '',
        recipientCount: validContacts.length,
        recipientIds,
        status: successCount > 0 ? 'sent' : 'failed',
        response: apiResult,
        sentBy: user.id,
      })
    }

    // ============ SMS 발송 ============
    else if (messageType === 'sms') {
      if (!smsSendNo) {
        return NextResponse.json(
          { error: 'SMS 발신번호가 설정되지 않았습니다.' },
          { status: 500 }
        )
      }

      const smsResult = await sendSms(
        smsAppKey,
        smsSecretKey,
        smsSendNo,
        validContacts,
        content || ''
      )

      successCount = smsResult.successCount
      failCount = smsResult.failCount
      requestId = smsResult.requestId
      if (smsResult.failedRecipients) {
        failedRecipients.push(...smsResult.failedRecipients)
      }

      await saveMessageLog(supabase, {
        templateId: 'sms',
        content: content || '',
        recipientCount: validContacts.length,
        recipientIds,
        status: successCount > 0 ? 'sent' : 'failed',
        response: smsResult,
        sentBy: user.id,
      })
    }

    return NextResponse.json({
      success: successCount > 0,
      sentCount: successCount,
      successCount,
      failCount,
      failedRecipients: failedRecipients.length > 0 ? failedRecipients : undefined,
      requestId,
    })

  } catch (error) {
    console.error('Error in message send API:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// SMS 발송 함수
async function sendSms(
  appKey: string,
  secretKey: string,
  sendNo: string,
  contacts: Contact[],
  content: string
): Promise<{
  success: boolean
  successCount: number
  failCount: number
  requestId?: string
  failedRecipients?: FailedRecipient[]
}> {
  try {
    const recipientList: SmsRecipient[] = contacts.map(contact => ({
      recipientNo: (contact.phone || contact.mobile || '').replace(/[^0-9]/g, ''),
    }))

    // SMS는 90자 이하, LMS는 2000자 이하
    const messageType = content.length <= 90 ? 'SMS' : 'LMS'
    const endpoint = messageType === 'SMS' ? 'sender/sms' : 'sender/mms'

    const smsBody = {
      body: content,
      sendNo,
      recipientList,
    }

    console.log('SMS request:', JSON.stringify(smsBody, null, 2))

    const response = await fetch(
      `${NHN_SMS_API}/${appKey}/${endpoint}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Secret-Key': secretKey,
        },
        body: JSON.stringify(smsBody),
      }
    )

    const result = await response.json()
    console.log('SMS response:', JSON.stringify(result, null, 2))

    if (result.header?.isSuccessful) {
      return {
        success: true,
        successCount: contacts.length,
        failCount: 0,
        requestId: result.body?.data?.requestId,
      }
    } else {
      return {
        success: false,
        successCount: 0,
        failCount: contacts.length,
        failedRecipients: [{
          name: '전체',
          phone: '',
          reason: result.header?.resultMessage || 'SMS 발송 실패',
        }],
      }
    }
  } catch (error) {
    console.error('SMS send error:', error)
    return {
      success: false,
      successCount: 0,
      failCount: contacts.length,
      failedRecipients: [{
        name: '전체',
        phone: '',
        reason: '네트워크 오류',
      }],
    }
  }
}

// 메시지 로그 저장 함수
async function saveMessageLog(
  supabase: Awaited<ReturnType<typeof createClient>>,
  data: {
    templateId: string
    content: string
    recipientCount: number
    recipientIds: string[]
    status: string
    response: unknown
    sentBy: string
  }
) {
  try {
    await supabase.from('message_logs').insert({
      template_id: data.templateId,
      content: data.content,
      recipient_count: data.recipientCount,
      recipient_ids: data.recipientIds,
      status: data.status,
      response: data.response,
      sent_by: data.sentBy,
    })
  } catch (error) {
    console.error('Error saving message log:', error)
  }
}
