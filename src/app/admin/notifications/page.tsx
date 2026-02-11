'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import {
  Mail,
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Bell,
  MessageCircle,
} from 'lucide-react'
import type { NotificationLog } from '@/types/admin'
import { isAbortError } from '@/hooks/useAbortableFetch'
import {
  AdminPageHeader,
  RefreshButton,
  StatCardsGrid,
  AdminFilterTabs,
  FilterDivider,
  AdminSkeleton,
  AdminEmptyState,
  AdminPagination,
} from '@/components/features/admin/ui'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Filters
  const [channelFilter, setChannelFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  // Pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [total, setTotal] = useState(0)
  const pageSize = 20

  // Stats
  const [stats, setStats] = useState({
    email: 0,
    sms: 0,
    alimtalk: 0,
    pending: 0,
    total: 0,
  })

  // AbortController ref
  const abortControllerRef = useRef<AbortController | null>(null)

  const fetchNotifications = useCallback(async (signal?: AbortSignal) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        pageSize: pageSize.toString(),
      })

      if (channelFilter && channelFilter !== 'all') {
        params.set('channel', channelFilter)
      }
      if (statusFilter && statusFilter !== 'all') {
        params.set('status', statusFilter)
      }

      const res = await fetch(`/api/admin/notifications?${params}`, { signal })

      // Check if request was aborted
      if (signal?.aborted) return

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch notifications')
      }

      // Check again after JSON parsing
      if (signal?.aborted) return

      setNotifications(data.data)
      setTotal(data.total)
      setTotalPages(data.totalPages)

      // Use stats from API response (calculated before pagination)
      if (data.stats) {
        setStats({
          email: data.stats.email || 0,
          sms: data.stats.sms || 0,
          alimtalk: data.stats.alimtalk || 0,
          pending: data.stats.pending || 0,
          total: data.stats.total || data.total || 0,
        })
      }
    } catch (err) {
      // Ignore abort errors
      if (isAbortError(err)) return

      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [page, channelFilter, statusFilter])

  useEffect(() => {
    // Abort previous request
    abortControllerRef.current?.abort()

    // Create new AbortController
    const controller = new AbortController()
    abortControllerRef.current = controller

    fetchNotifications(controller.signal)

    // Cleanup on unmount or dependency change
    return () => {
      controller.abort()
    }
  }, [fetchNotifications])

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  // Filter tabs configuration
  const channelTabs = [
    { id: 'all', label: '전체 채널' },
    { id: 'email', label: '이메일' },
    { id: 'sms', label: 'SMS' },
    { id: 'alimtalk', label: '알림톡' },
  ]

  const statusTabs = [
    { id: 'all', label: '전체 상태' },
    { id: 'sent', label: '발송 완료' },
    { id: 'failed', label: '발송 실패' },
    { id: 'pending', label: '대기 중' },
  ]

  // Stats configuration
  const statsConfig = [
    { label: '알림톡', value: stats.alimtalk, icon: MessageCircle, color: '#facc15' },
    { label: 'SMS', value: stats.sms, icon: MessageSquare, color: '#22c55e' },
    { label: '이메일', value: stats.email, icon: Mail, color: '#3b82f6' },
  ]

  const handleChannelChange = (channel: string) => {
    setChannelFilter(channel)
    setPage(1)
  }

  const handleStatusChange = (status: string) => {
    setStatusFilter(status)
    setPage(1)
  }

  return (
    <div className="min-h-screen">
      {/* Page Header */}
      <AdminPageHeader
        title="발송 내역"
        subtitle="Notification History"
        actions={
          <RefreshButton
            onClick={() => fetchNotifications()}
            loading={loading}
            disabled={loading}
          />
        }
      />

      <main className="max-w-[1600px] mx-auto px-6 pb-12">
        {/* Stats */}
        <StatCardsGrid stats={statsConfig} columns={3} />

        {/* Filters */}
        <div className="flex gap-3 mb-6 flex-wrap items-center">
          <AdminFilterTabs
            tabs={channelTabs}
            activeTab={channelFilter}
            onTabChange={handleChannelChange}
          />
          <FilterDivider />
          <AdminFilterTabs
            tabs={statusTabs}
            activeTab={statusFilter}
            onTabChange={handleStatusChange}
          />
        </div>

        {/* History */}
        <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
          <div className="p-5 border-b border-zinc-800">
            <h2 className="text-sm font-medium text-zinc-100">발송 내역</h2>
            <p className="text-xs text-zinc-500 mt-1">
              총 {total}건
            </p>
          </div>

          {loading ? (
            <div className="p-5">
              <AdminSkeleton variant="list-item" count={5} />
            </div>
          ) : error ? (
            <div className="p-16 text-center">
              <XCircle size={48} className="mx-auto mb-4 text-red-400" />
              <p className="text-red-400">{error}</p>
              <button
                onClick={() => fetchNotifications()}
                className="mt-4 px-6 py-2.5 rounded-lg text-sm transition-colors bg-zinc-800 border border-zinc-700 text-zinc-300 hover:bg-zinc-700"
              >
                다시 시도
              </button>
            </div>
          ) : notifications.length === 0 ? (
            <AdminEmptyState
              icon={Bell}
              title="발송 내역이 없습니다."
              description="메시지 메뉴에서 알림을 발송해보세요."
            />
          ) : (
            <div className="divide-y divide-zinc-800">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="p-4 transition-colors hover:bg-zinc-800/50"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {notification.channel === 'email' ? (
                        <Mail size={18} className="text-blue-400 flex-shrink-0" />
                      ) : notification.channel === 'alimtalk' ? (
                        <MessageCircle size={18} className="text-yellow-400 flex-shrink-0" />
                      ) : (
                        <MessageSquare size={18} className="text-green-400 flex-shrink-0" />
                      )}
                      <div>
                        <p className="text-zinc-100 text-sm font-medium">
                          {notification.subject || '(제목 없음)'}
                        </p>
                        <p className="text-xs text-zinc-500 mt-0.5">
                          {notification.recipientCount > 1
                            ? `${notification.recipientCount}명에게 발송`
                            : notification.recipientEmail || notification.recipientPhone || '1명에게 발송'}
                          {' • '}
                          {notification.channel === 'alimtalk' ? '카카오 알림톡'
                            : notification.channel === 'sms' ? 'SMS 문자'
                            : notification.notificationType === 'exhibition_invite' ? '전시 초대' : '이메일'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      {notification.status === 'sent' && (
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs bg-green-500/10 text-green-400">
                          <CheckCircle size={12} />
                          발송 완료
                        </span>
                      )}
                      {notification.status === 'failed' && (
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs bg-red-500/10 text-red-400">
                          <XCircle size={12} />
                          발송 실패
                        </span>
                      )}
                      {notification.status === 'pending' && (
                        <span className="flex items-center gap-1.5 px-2 py-0.5 rounded text-xs bg-yellow-500/10 text-yellow-400">
                          <Clock size={12} />
                          대기 중
                        </span>
                      )}
                      <span className="text-xs text-zinc-500">
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                  {notification.errorMessage && (
                    <p className="text-xs mt-2 ml-7 text-red-400">
                      오류: {notification.errorMessage}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination */}
        <AdminPagination
          page={page}
          totalPages={totalPages}
          total={total}
          pageSize={pageSize}
          onPageChange={setPage}
        />
      </main>
    </div>
  )
}
