import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { hasPermission } from '@/types/admin'
import { sendEmail, generateExhibitionInviteEmail, generateGeneralNoticeEmail } from '@/lib/email'
import type { AdminRole } from '@/types/admin'

interface SendNotificationRequest {
  notificationType: 'exhibition_invite' | 'general_notice'
  channel: 'email' | 'sms'
  recipients: Array<{
    id: string
    name: string
    email?: string
    phone?: string
  }>
  subject: string
  content: string
  // For exhibition invite
  exhibitionTitle?: string
  exhibitionDate?: string
  exhibitionVenue?: string
  rsvpLink?: string
}

// POST /api/admin/notifications/send - Send notifications
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile for role check
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || !hasPermission(profile.role as AdminRole, 'notifications', 'send')) {
      return NextResponse.json({ error: 'Forbidden: Insufficient permissions' }, { status: 403 })
    }

    const body: SendNotificationRequest = await request.json()
    const { notificationType, channel, recipients, subject, content } = body

    // Validate required fields
    if (!notificationType || !channel || !recipients || recipients.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields: notificationType, channel, recipients' },
        { status: 400 }
      )
    }

    if (channel === 'email' && !subject) {
      return NextResponse.json(
        { error: 'Subject is required for email notifications' },
        { status: 400 }
      )
    }

    const results: Array<{
      recipientId: string
      recipientName: string
      success: boolean
      error?: string
    }> = []

    // Process each recipient
    for (const recipient of recipients) {
      if (channel === 'email') {
        if (!recipient.email) {
          results.push({
            recipientId: recipient.id,
            recipientName: recipient.name,
            success: false,
            error: 'No email address',
          })
          continue
        }

        // Generate email HTML based on notification type
        let html: string
        if (notificationType === 'exhibition_invite') {
          html = generateExhibitionInviteEmail({
            recipientName: recipient.name,
            exhibitionTitle: body.exhibitionTitle || subject,
            exhibitionDate: body.exhibitionDate || '',
            exhibitionVenue: body.exhibitionVenue,
            description: content,
            rsvpLink: body.rsvpLink,
          })
        } else {
          html = generateGeneralNoticeEmail({
            recipientName: recipient.name,
            subject,
            content,
          })
        }

        // Send email
        const emailResult = await sendEmail({
          to: recipient.email,
          subject,
          html,
        })

        // Log to database
        const { error: logError } = await supabase.from('notification_logs').insert({
          notification_type: notificationType,
          channel: 'email',
          recipient_id: recipient.id,
          recipient_email: recipient.email,
          subject,
          content,
          status: emailResult.success ? 'sent' : 'failed',
          error_message: emailResult.error || null,
          provider: 'resend',
          created_by: user.id,
          sent_at: emailResult.success ? new Date().toISOString() : null,
        })

        if (logError) {
          console.error('Error logging notification:', logError)
        }

        results.push({
          recipientId: recipient.id,
          recipientName: recipient.name,
          success: emailResult.success,
          error: emailResult.error,
        })
      } else if (channel === 'sms') {
        // SMS sending not implemented yet
        results.push({
          recipientId: recipient.id,
          recipientName: recipient.name,
          success: false,
          error: 'SMS sending is not configured',
        })

        // Log the attempt
        await supabase.from('notification_logs').insert({
          notification_type: notificationType,
          channel: 'sms',
          recipient_id: recipient.id,
          recipient_phone: recipient.phone || null,
          subject: null,
          content,
          status: 'failed',
          error_message: 'SMS sending is not configured',
          provider: null,
          created_by: user.id,
        })
      }
    }

    const successCount = results.filter(r => r.success).length
    const failCount = results.filter(r => !r.success).length

    return NextResponse.json({
      success: true,
      message: `${successCount}건 발송 완료, ${failCount}건 실패`,
      results,
      summary: {
        total: recipients.length,
        sent: successCount,
        failed: failCount,
      },
    })
  } catch (error) {
    console.error('Error in POST /api/admin/notifications/send:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
