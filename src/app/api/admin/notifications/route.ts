import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { dbNotificationLogToNotificationLog } from '@/types/admin'

interface MessageLog {
  id: string
  template_id: string
  content: string
  recipient_count: number
  recipient_ids: string[]
  status: string
  response: unknown
  sent_by: string
  created_at: string
}

interface UnifiedNotification {
  id: string
  channel: 'email' | 'sms' | 'alimtalk'
  status: string
  subject: string | null
  recipientEmail: string | null
  recipientPhone: string | null
  recipientCount: number
  notificationType: string
  errorMessage: string | null
  createdAt: string
  source: 'notification_logs' | 'message_logs'
}

// GET /api/admin/notifications - List notification logs (unified)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse query params
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const channel = searchParams.get('channel')
    const status = searchParams.get('status')

    // Fetch from notification_logs
    const { data: notificationData, error: notificationError } = await supabase
      .from('notification_logs')
      .select('*')
      .order('created_at', { ascending: false })

    if (notificationError) {
      console.error('Error fetching notification_logs:', notificationError)
    }

    // Fetch from message_logs
    const { data: messageData, error: messageError } = await supabase
      .from('message_logs')
      .select('*')
      .order('created_at', { ascending: false })

    if (messageError) {
      console.error('Error fetching message_logs:', messageError)
    }

    // Convert notification_logs to unified format
    const notificationItems: UnifiedNotification[] = (notificationData || []).map(n => {
      const converted = dbNotificationLogToNotificationLog(n)
      return {
        id: converted.id,
        channel: converted.channel as 'email' | 'sms' | 'alimtalk',
        status: converted.status,
        subject: converted.subject,
        recipientEmail: converted.recipientEmail,
        recipientPhone: converted.recipientPhone,
        recipientCount: 1,
        notificationType: converted.notificationType,
        errorMessage: converted.errorMessage,
        createdAt: converted.createdAt,
        source: 'notification_logs' as const,
      }
    })

    // Convert message_logs to unified format
    const messageItems: UnifiedNotification[] = (messageData || []).map((m: MessageLog) => {
      // Determine channel from template_id
      let messageChannel: 'email' | 'sms' | 'alimtalk' = 'alimtalk'
      if (m.template_id === 'sms') {
        messageChannel = 'sms'
      } else if (m.template_id === 'brand-message') {
        messageChannel = 'alimtalk'
      }

      // Extract error message from response if failed
      let errorMessage: string | null = null
      if (m.status === 'failed' && m.response) {
        const resp = m.response as { header?: { resultMessage?: string } }
        errorMessage = resp.header?.resultMessage || '발송 실패'
      }

      return {
        id: m.id,
        channel: messageChannel,
        status: m.status,
        subject: m.template_id === 'sms' ? '[SMS] 문자 발송' : `[알림톡] ${m.template_id}`,
        recipientEmail: null,
        recipientPhone: null,
        recipientCount: m.recipient_count,
        notificationType: 'message',
        errorMessage,
        createdAt: m.created_at,
        source: 'message_logs' as const,
      }
    })

    // Merge and sort by date
    let allItems = [...notificationItems, ...messageItems].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    // Apply channel filter
    if (channel && channel !== 'all') {
      allItems = allItems.filter(item => item.channel === channel)
    }

    // Apply status filter
    if (status && status !== 'all') {
      allItems = allItems.filter(item => item.status === status)
    }

    // Calculate stats before pagination
    const stats = {
      email: allItems.filter(n => n.channel === 'email').length,
      sms: allItems.filter(n => n.channel === 'sms').length,
      alimtalk: allItems.filter(n => n.channel === 'alimtalk').length,
      pending: allItems.filter(n => n.status === 'pending').length,
      total: allItems.length,
    }

    // Apply pagination
    const total = allItems.length
    const from = (page - 1) * pageSize
    const paginatedItems = allItems.slice(from, from + pageSize)

    return NextResponse.json({
      data: paginatedItems,
      total,
      page,
      pageSize,
      totalPages: Math.ceil(total / pageSize),
      stats,
    })
  } catch (error) {
    console.error('Error in GET /api/admin/notifications:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
