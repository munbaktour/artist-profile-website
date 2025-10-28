import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

// Resend 인스턴스를 함수 내에서 생성하여 빌드 타임 에러 방지
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }
  return new Resend(apiKey)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // 입력값 검증
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: '필수 항목을 입력해주세요.' },
        { status: 400 }
      )
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 형식이 아닙니다.' },
        { status: 400 }
      )
    }

    // Resend로 이메일 전송
    const resend = getResendClient()
    const { data, error } = await resend.emails.send({
      from: 'KWANHOONARTE <onboarding@resend.dev>', // Resend 테스트 도메인
      to: ['kwanhoonarte@gmail.com'], // 수신 이메일
      replyTo: email, // 문의자 이메일로 답장 가능
      subject: `[갤러리 문의] ${subject || '제목 없음'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #000; border-bottom: 2px solid #000; padding-bottom: 10px;">
            새로운 문의가 도착했습니다
          </h2>

          <div style="margin: 20px 0;">
            <p style="margin: 10px 0;"><strong>이름:</strong> ${name}</p>
            <p style="margin: 10px 0;"><strong>이메일:</strong> ${email}</p>
            ${phone ? `<p style="margin: 10px 0;"><strong>연락처:</strong> ${phone}</p>` : ''}
            ${subject ? `<p style="margin: 10px 0;"><strong>문의 유형:</strong> ${subject}</p>` : ''}
          </div>

          <div style="margin: 20px 0; padding: 15px; background-color: #f5f5f5; border-left: 4px solid #000;">
            <p style="margin: 0; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
            <p>이 메일은 KWANHOONARTE 갤러리 웹사이트에서 자동으로 발송되었습니다.</p>
            <p>문의자에게 답장하려면 "답장" 버튼을 클릭하세요.</p>
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('Resend 에러:', error)
      return NextResponse.json(
        { error: '이메일 전송에 실패했습니다. 잠시 후 다시 시도해주세요.' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, messageId: data?.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('API 에러:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
