import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { dbNotificationLogToNotificationLog } from '@/types/admin'
import type { NotificationLog } from '@/types/admin'

// GET /api/admin/notifications - List notification logs
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

    // Build query for notification_logs
    let query = supabase
      .from('notification_logs')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })

    // Apply channel filter
    if (channel && channel !== 'all') {
      query = query.eq('channel', channel)
    }

    // Apply status filter
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    // Apply pagination
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)

    const { data, count, error } = await query

    if (error) {
      console.error('Error fetching notification_logs:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Convert to camelCase
    const notifications: NotificationLog[] = (data || []).map(dbNotificationLogToNotificationLog)

    // Get stats (separate query without pagination)
    const { data: allData } = await supabase
      .from('notification_logs')
      .select('channel, status')

    const stats = {
      email: (allData || []).filter(n => n.channel === 'email').length,
      sms: (allData || []).filter(n => n.channel === 'sms').length,
      alimtalk: (allData || []).filter(n => n.channel === 'alimtalk').length,
      pending: (allData || []).filter(n => n.status === 'pending').length,
      total: allData?.length || 0,
    }

    return NextResponse.json({
      data: notifications,
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
      stats,
    })
  } catch (error) {
    console.error('Error in GET /api/admin/notifications:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
