'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import {
  Mail,
  MessageSquare,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  Bell,
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
    pending: 0,
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

      const emailCount = data.data.filter((n: NotificationLog) => n.channel === 'email').length
      const smsCount = data.data.filter((n: NotificationLog) => n.channel === 'sms').length
      const pendingCount = data.data.filter((n: NotificationLog) => n.status === 'pending').length

      setStats({
        email: emailCount,
        sms: smsCount,
        pending: pendingCount,
      })
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
  ]

  const statusTabs = [
    { id: 'all', label: '전체 상태' },
    { id: 'sent', label: '발송 완료' },
    { id: 'failed', label: '발송 실패' },
    { id: 'pending', label: '대기 중' },
  ]

  // Stats configuration
  const statsConfig = [
    { label: '이메일 발송', value: stats.email, icon: Mail, color: '#3b82f6' },
    { label: 'SMS 발송', value: stats.sms, icon: MessageSquare, color: '#22c55e' },
    { label: '대기 중', value: stats.pending, icon: Clock, color: '#eab308' },
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
        title="알림 관리"
        subtitle="Notification Management"
        actionButton={{
          label: '새 알림',
          icon: Plus,
          href: '/admin/notifications/compose',
        }}
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
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(212,175,55,0.2)',
          }}
        >
          <div
            className="p-5"
            style={{ borderBottom: '1px solid rgba(212,175,55,0.15)' }}
          >
            <h2 className="text-lg font-light text-[#f0f0f0]">발송 내역</h2>
            <p className="text-sm mt-1" style={{ color: 'rgba(212,175,55,0.6)' }}>
              총 {total}건
            </p>
          </div>

          {loading ? (
            <div className="p-5">
              <AdminSkeleton variant="list-item" count={5} />
            </div>
          ) : error ? (
            <div className="p-16 text-center">
              <XCircle size={48} className="mx-auto mb-4" style={{ color: '#ef4444' }} />
              <p style={{ color: '#ef4444' }}>{error}</p>
              <button
                onClick={() => fetchNotifications()}
                className="mt-4 px-6 py-2.5 rounded-lg text-sm transition-all"
                style={{
                  background: 'rgba(212,175,55,0.1)',
                  border: '1px solid rgba(212,175,55,0.3)',
                  color: '#D4AF37',
                }}
              >
                다시 시도
              </button>
            </div>
          ) : notifications.length === 0 ? (
            <AdminEmptyState
              icon={Bell}
              title="발송 내역이 없습니다."
              description="새 알림을 작성하여 연락처에게 발송해보세요."
              action={{
                label: '새 알림 작성',
                href: '/admin/notifications/compose',
                icon: Plus,
              }}
            />
          ) : (
            <div>
              {notifications.map((notification, idx) => (
                <div
                  key={notification.id}
                  className="p-5 transition-all hover:bg-white/[0.02]"
                  style={{
                    borderBottom: idx < notifications.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className="p-3 rounded-lg"
                        style={{
                          background: notification.channel === 'email'
                            ? 'rgba(59,130,246,0.15)'
                            : 'rgba(34,197,94,0.15)',
                        }}
                      >
                        {notification.channel === 'email' ? (
                          <Mail size={20} style={{ color: '#3b82f6' }} />
                        ) : (
                          <MessageSquare size={20} style={{ color: '#22c55e' }} />
                        )}
                      </div>
                      <div>
                        <p className="text-[#f0f0f0] font-medium">
                          {notification.subject || '(제목 없음)'}
                        </p>
                        <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
                          {notification.recipientEmail || notification.recipientPhone || '알 수 없음'}
                          {' • '}
                          {notification.notificationType === 'exhibition_invite' ? '전시 초대' : '일반 공지'}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {notification.status === 'sent' && (
                        <span
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                          style={{
                            background: 'rgba(34,197,94,0.15)',
                            color: '#22c55e',
                          }}
                        >
                          <CheckCircle size={12} />
                          발송 완료
                        </span>
                      )}
                      {notification.status === 'failed' && (
                        <span
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                          style={{
                            background: 'rgba(239,68,68,0.15)',
                            color: '#ef4444',
                          }}
                        >
                          <XCircle size={12} />
                          발송 실패
                        </span>
                      )}
                      {notification.status === 'pending' && (
                        <span
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs"
                          style={{
                            background: 'rgba(234,179,8,0.15)',
                            color: '#eab308',
                          }}
                        >
                          <Clock size={12} />
                          대기 중
                        </span>
                      )}
                      <span className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                  {notification.errorMessage && (
                    <p className="text-xs mt-2 ml-16" style={{ color: '#ef4444' }}>
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
