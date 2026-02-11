import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendEmail, generateGeneralNoticeEmail } from '@/lib/email'

// NHN Cloud API 엔드포인트
const NHN_ALIMTALK_API = 'https://api-alimtalk.cloud.toast.com/alimtalk/v2.3/appkeys'
const NHN_BRAND_MESSAGE_API = 'https://api-alimtalk.cloud.toast.com/brand-message/v1.0/appkeys'
const NHN_SMS_API = 'https://api-sms.cloud.toast.com/sms/v3.0/appKeys'

// 메시지 타입
type MessageType = 'alimtalk' | 'brandmessage' | 'sms' | 'kakao_sms' | 'email'
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
  // 이메일용
  subject?: string
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
  email: string | null
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

    // 환경변수 디버깅 (값은 마스킹)
    console.log('=== NHN Cloud ENV Check ===')
    console.log('APPKEY:', appKey ? `${appKey.substring(0, 4)}...${appKey.substring(appKey.length - 4)}` : 'NOT SET')
    console.log('SECRET_KEY:', secretKey ? `${secretKey.substring(0, 4)}...` : 'NOT SET')
    console.log('SENDER_KEY:', senderKey ? `${senderKey.substring(0, 8)}...` : 'NOT SET')

    if (!appKey || !secretKey || !senderKey) {
      console.error('NHN Cloud credentials not configured')
      console.error('Missing:', !appKey ? 'APPKEY' : '', !secretKey ? 'SECRET_KEY' : '', !senderKey ? 'SENDER_KEY' : '')
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
      subject,
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

    if (messageType === 'email') {
      if (!subject) {
        return NextResponse.json(
          { error: '이메일 제목을 입력해주세요.' },
          { status: 400 }
        )
      }
      if (!content) {
        return NextResponse.json(
          { error: '이메일 내용을 입력해주세요.' },
          { status: 400 }
        )
      }
    }

    // 연락처에서 전화번호/이메일 조회
    const { data: contacts, error: contactsError } = await supabase
      .from('contacts')
      .select('id, name, phone, mobile, email')
      .in('id', recipientIds)

    if (contactsError) {
      console.error('Error fetching contacts:', contactsError)
      return NextResponse.json(
        { error: '연락처 조회에 실패했습니다.' },
        { status: 500 }
      )
    }

    // 메시지 타입에 따라 유효한 연락처 필터링
    let validContacts: Contact[]
    if (messageType === 'email') {
      validContacts = (contacts as Contact[]).filter(c => c.email)
      if (validContacts.length === 0) {
        return NextResponse.json(
          { error: '이메일 주소가 등록된 연락처가 없습니다.' },
          { status: 400 }
        )
      }
    } else {
      validContacts = (contacts as Contact[]).filter(c => c.phone || c.mobile)
      if (validContacts.length === 0) {
        return NextResponse.json(
          { error: '전화번호가 등록된 연락처가 없습니다.' },
          { status: 400 }
        )
      }
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

      const apiUrl = `${NHN_ALIMTALK_API}/${appKey}/messages`
      console.log('Alimtalk API URL:', apiUrl)

      const apiResponse = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Secret-Key': secretKey,
        },
        body: JSON.stringify(alimtalkBody),
      })

      console.log('Alimtalk HTTP status:', apiResponse.status, apiResponse.statusText)

      const apiResult = await apiResponse.json()
      console.log('=== Alimtalk Full Response ===')
      console.log('Response:', JSON.stringify(apiResult, null, 2))
      console.log('Header:', JSON.stringify(apiResult.header, null, 2))
      console.log('Message:', JSON.stringify(apiResult.message, null, 2))

      if (apiResult.header?.isSuccessful) {
        requestId = apiResult.message?.requestId

        // 개별 발송 결과 확인
        if (apiResult.message?.sendResults && apiResult.message.sendResults.length > 0) {
          successCount = 0
          failCount = 0

          for (const result of apiResult.message.sendResults) {
            // NHN Cloud API 응답 구조 디버깅
            console.log('sendResult item:', JSON.stringify(result))

            // NHN Cloud API: resultCode가 0이면 성공, 그 외는 실패
            // resultMessage가 'SUCCESS'면 성공
            const isSuccess = result.resultCode === 0 ||
                              result.resultCode === '0' ||
                              result.resultMessage === 'SUCCESS' ||
                              result.isSuccessful === true

            console.log(`recipientNo: ${result.recipientNo}, isSuccess: ${isSuccess}, resultCode: ${result.resultCode}, resultMessage: ${result.resultMessage}`)

            if (isSuccess) {
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

          console.log(`Final counts - success: ${successCount}, fail: ${failCount}`)
        } else {
          // sendResults가 없으면 전체 성공으로 간주
          successCount = validContacts.length
          failCount = 0
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
      await saveNotificationLog(supabase, {
        channel: 'alimtalk',
        subject: `[알림톡] ${templateCode}`,
        content: `템플릿: ${templateCode}, 수신자: ${validContacts.length}명`,
        recipientPhone: validContacts.length === 1
          ? (validContacts[0].phone || validContacts[0].mobile || '').replace(/[^0-9]/g, '')
          : `${validContacts.length}명`,
        recipientCount: validContacts.length,
        status: successCount > 0 ? 'sent' : 'failed',
        errorMessage: failCount > 0 ? `${failCount}건 실패` : null,
        provider: 'nhn_cloud',
        providerResponse: apiResult,
        createdBy: user.id,
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

      const brandApiUrl = `${NHN_BRAND_MESSAGE_API}/${appKey}/freestyle-messages`
      console.log('Brand message API URL:', brandApiUrl)

      const apiResponse = await fetch(brandApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Secret-Key': secretKey,
        },
        body: JSON.stringify(brandMessageBody),
      })

      console.log('Brand message HTTP status:', apiResponse.status, apiResponse.statusText)

      const apiResult = await apiResponse.json()
      console.log('=== Brand Message Full Response ===')
      console.log('Response:', JSON.stringify(apiResult, null, 2))
      console.log('Header:', JSON.stringify(apiResult.header, null, 2))
      console.log('resultCode:', apiResult.header?.resultCode)
      console.log('resultMessage:', apiResult.header?.resultMessage)

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

      await saveNotificationLog(supabase, {
        channel: 'alimtalk',
        subject: '[브랜드 메시지]',
        content: content || '',
        recipientPhone: validContacts.length === 1
          ? (validContacts[0].phone || validContacts[0].mobile || '').replace(/[^0-9]/g, '')
          : `${validContacts.length}명`,
        recipientCount: validContacts.length,
        status: successCount > 0 ? 'sent' : 'failed',
        errorMessage: failCount > 0 ? apiResult.header?.resultMessage : null,
        provider: 'nhn_cloud',
        providerResponse: apiResult,
        createdBy: user.id,
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

      await saveNotificationLog(supabase, {
        channel: 'sms',
        subject: '[SMS] 문자 발송',
        content: content || '',
        recipientPhone: validContacts.length === 1
          ? (validContacts[0].phone || validContacts[0].mobile || '').replace(/[^0-9]/g, '')
          : `${validContacts.length}명`,
        recipientCount: validContacts.length,
        status: successCount > 0 ? 'sent' : 'failed',
        errorMessage: failCount > 0 ? `${failCount}건 실패` : null,
        provider: 'nhn_cloud',
        providerResponse: smsResult,
        createdBy: user.id,
      })
    }

    // ============ 이메일 발송 ============
    else if (messageType === 'email') {
      console.log('=== Email Send Debug Info ===')
      console.log('validContacts count:', validContacts.length)
      console.log('subject:', subject)

      // 각 수신자에게 이메일 발송
      for (const contact of validContacts) {
        if (!contact.email) continue

        try {
          // 이메일 HTML 생성
          const html = generateGeneralNoticeEmail({
            recipientName: contact.name || '고객',
            subject: subject || '',
            content: content || '',
          })

          // 이메일 발송
          const result = await sendEmail({
            to: contact.email,
            subject: subject || '',
            html,
          })

          if (result.success) {
            successCount++
          } else {
            failCount++
            failedRecipients.push({
              name: contact.name || '',
              phone: contact.email,
              reason: result.error || '발송 실패',
            })
          }
        } catch (error) {
          console.error('Email send error for:', contact.email, error)
          failCount++
          failedRecipients.push({
            name: contact.name || '',
            phone: contact.email,
            reason: '이메일 발송 오류',
          })
        }
      }

      // 로그 저장
      await saveNotificationLog(supabase, {
        channel: 'email',
        subject: subject || '',
        content: content || '',
        recipientPhone: validContacts.length === 1
          ? validContacts[0].email || ''
          : `${validContacts.length}명`,
        recipientCount: validContacts.length,
        status: successCount > 0 ? 'sent' : 'failed',
        errorMessage: failCount > 0 ? `${failCount}건 실패` : null,
        provider: 'resend',
        providerResponse: { successCount, failCount },
        createdBy: user.id,
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

// 알림 로그 저장 함수 (notification_logs 테이블 사용)
async function saveNotificationLog(
  supabase: Awaited<ReturnType<typeof createClient>>,
  data: {
    channel: 'sms' | 'alimtalk' | 'email'
    subject: string
    content: string
    recipientPhone: string | null
    recipientCount: number
    status: 'sent' | 'failed' | 'pending'
    errorMessage: string | null
    provider: string
    providerResponse: unknown
    createdBy: string
  }
) {
  try {
    const insertData = {
      notification_type: 'general_notice',
      channel: data.channel,
      recipient_id: null,
      recipient_email: null,
      recipient_phone: data.recipientPhone,
      subject: data.subject,
      content: data.content,
      status: data.status,
      error_message: data.errorMessage,
      provider: data.provider,
      provider_response: data.providerResponse,
      created_by: data.createdBy,
      sent_at: data.status === 'sent' ? new Date().toISOString() : null,
    }

    console.log('=== Notification Log Insert Debug ===')
    console.log('Insert data:', JSON.stringify(insertData, null, 2))

    const { data: insertedData, error } = await supabase
      .from('notification_logs')
      .insert(insertData)
      .select()

    if (error) {
      console.error('Error inserting notification log:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      console.error('Error details:', error.details)
      console.error('Error hint:', error.hint)
    } else {
      console.log('Notification log saved successfully')
      console.log('Inserted data:', JSON.stringify(insertedData, null, 2))
    }
  } catch (error) {
    console.error('Error saving notification log (catch):', error)
  }
}
