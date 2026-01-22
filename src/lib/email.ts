import { Resend } from 'resend'

export interface EmailOptions {
  to: string | string[]
  subject: string
  html: string
  text?: string
}

export interface EmailResult {
  success: boolean
  messageId?: string
  error?: string
}

/**
 * Create Resend client
 */
function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY

  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set.')
  }

  return new Resend(apiKey)
}

/**
 * Send an email using Resend
 */
export async function sendEmail(options: EmailOptions): Promise<EmailResult> {
  try {
    const resend = getResendClient()
    const from = process.env.RESEND_FROM || 'KWANHOONARTE <noreply@kwanhoonarte.com>'

    const { data, error } = await resend.emails.send({
      from,
      to: Array.isArray(options.to) ? options.to : [options.to],
      subject: options.subject,
      html: options.html,
      text: options.text,
    })

    if (error) {
      return {
        success: false,
        error: error.message,
      }
    }

    return {
      success: true,
      messageId: data?.id,
    }
  } catch (error) {
    console.error('Email sending failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    }
  }
}

/**
 * Send multiple emails in batch
 */
export async function sendBatchEmails(
  emails: Array<{
    to: string
    subject: string
    html: string
    recipientId?: string
  }>
): Promise<Array<EmailResult & { to: string; recipientId?: string }>> {
  const results = await Promise.all(
    emails.map(async (email) => {
      const result = await sendEmail({
        to: email.to,
        subject: email.subject,
        html: email.html,
      })
      return {
        ...result,
        to: email.to,
        recipientId: email.recipientId,
      }
    })
  )

  return results
}

/**
 * Generate exhibition invitation email HTML
 */
export function generateExhibitionInviteEmail(params: {
  recipientName: string
  exhibitionTitle: string
  exhibitionDate: string
  exhibitionVenue?: string
  description?: string
  rsvpLink?: string
}): string {
  const { recipientName, exhibitionTitle, exhibitionDate, exhibitionVenue, description, rsvpLink } = params

  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${exhibitionTitle}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <h1 style="color: #D4AF37; font-size: 14px; letter-spacing: 3px; margin: 0;">
                KWANHOONARTE
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
                ${recipientName}님께,
              </p>

              <h2 style="color: #ffffff; font-size: 24px; margin: 0 0 16px; line-height: 1.4;">
                ${exhibitionTitle}
              </h2>

              <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
                ${description || '관훈아르떼 갤러리에서 새로운 전시회에 여러분을 초대합니다.'}
              </p>

              <table cellpadding="0" cellspacing="0" style="margin: 24px 0; width: 100%;">
                <tr>
                  <td style="padding: 16px; background-color: #262626; border-radius: 8px;">
                    <p style="color: #a1a1aa; font-size: 12px; margin: 0 0 4px;">일시</p>
                    <p style="color: #ffffff; font-size: 16px; margin: 0;">${exhibitionDate}</p>
                    ${exhibitionVenue ? `
                    <p style="color: #a1a1aa; font-size: 12px; margin: 16px 0 4px;">장소</p>
                    <p style="color: #ffffff; font-size: 16px; margin: 0;">${exhibitionVenue}</p>
                    ` : ''}
                  </td>
                </tr>
              </table>

              ${rsvpLink ? `
              <table cellpadding="0" cellspacing="0" style="margin: 24px 0;">
                <tr>
                  <td style="background: linear-gradient(to right, #D4AF37, #F5D67B, #B8960C); border-radius: 8px; padding: 14px 28px;">
                    <a href="${rsvpLink}" style="color: #1a1a1a; text-decoration: none; font-weight: 600; font-size: 14px;">
                      참석 확인하기
                    </a>
                  </td>
                </tr>
              </table>
              ` : ''}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 40px; border-top: 1px solid #262626; margin-top: 20px;">
              <p style="color: #52525b; font-size: 12px; line-height: 1.6; margin: 0;">
                관훈아르떼<br>
                서울시 종로구 인사동길 19 관훈빌딩<br>
                Tel: 02-733-6469
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}

/**
 * Generate general notice email HTML
 */
export function generateGeneralNoticeEmail(params: {
  recipientName: string
  subject: string
  content: string
}): string {
  const { recipientName, subject, content } = params

  return `
<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0a0a0a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0a0a; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #1a1a1a; border-radius: 12px; overflow: hidden;">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center;">
              <h1 style="color: #D4AF37; font-size: 14px; letter-spacing: 3px; margin: 0;">
                KWANHOONARTE
              </h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 20px 40px;">
              <p style="color: #a1a1aa; font-size: 14px; line-height: 1.6; margin: 0 0 20px;">
                ${recipientName}님께,
              </p>

              <div style="color: #ffffff; font-size: 15px; line-height: 1.8;">
                ${content.replace(/\n/g, '<br>')}
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 40px; border-top: 1px solid #262626; margin-top: 20px;">
              <p style="color: #52525b; font-size: 12px; line-height: 1.6; margin: 0;">
                관훈아르떼<br>
                서울시 종로구 인사동길 19 관훈빌딩<br>
                Tel: 02-733-6469
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`
}
