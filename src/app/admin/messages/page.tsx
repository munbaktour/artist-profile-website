'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Send,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
  Plus,
  Loader2,
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface MessageLog {
  id: string
  template_id: string
  content: string
  recipient_count: number
  status: 'sent' | 'failed' | 'pending'
  created_at: string
}

// 상태별 스타일
const statusConfig = {
  sent: { label: '발송 완료', icon: CheckCircle2, color: 'text-green-400 bg-green-500/10' },
  failed: { label: '발송 실패', icon: XCircle, color: 'text-red-400 bg-red-500/10' },
  pending: { label: '대기 중', icon: Clock, color: 'text-yellow-400 bg-yellow-500/10' },
}

// 템플릿 ID → 라벨 매핑
const templateLabels: Record<string, string> = {
  exhibition_invite: '전시 초대',
  general_notice: '일반 공지',
  event_invite: '행사 안내',
  thanks: '감사 인사',
  custom: '직접 작성',
}

export default function MessagesPage() {
  const [history, setHistory] = useState<MessageLog[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({ total: 0, sent: 0, failed: 0 })

  useEffect(() => {
    const controller = new AbortController()
    fetch('/api/admin/messages', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (data.data) setHistory(data.data)
        if (data.stats) setStats(data.stats)
      })
      .catch(err => {
        if (err.name !== 'AbortError') console.error('Failed to fetch messages:', err)
      })
      .finally(() => setLoading(false))
    return () => controller.abort()
  }, [])

  const statItems = [
    { label: '총 발송', value: stats.total, icon: Send },
    { label: '발송 성공', value: stats.sent, icon: CheckCircle2 },
    { label: '발송 실패', value: stats.failed, icon: XCircle },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zinc-100">메시지 발송</h1>
          <p className="text-zinc-500 text-sm mt-0.5">
            카카오톡 알림톡/친구톡 발송 내역을 관리합니다.
          </p>
        </div>
        <Link href="/admin/messages/compose">
          <Button className="bg-[#D4AF37] hover:bg-[#C49B30] text-black font-medium">
            <Plus className="w-4 h-4 mr-2" />
            새 메시지
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {statItems.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex items-center gap-4"
            >
              <Icon className="w-5 h-5 text-zinc-400 flex-shrink-0" />
              <div>
                <p className="text-2xl font-semibold text-zinc-100">{stat.value}</p>
                <p className="text-xs text-zinc-500">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* NHN Cloud 연동 완료 안내 */}
      <div className="p-4 rounded-lg bg-green-900/20 border border-green-800/30 flex items-start gap-3">
        <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-green-300 font-medium">NHN Cloud 연동 완료</p>
          <p className="text-xs text-green-400/70 mt-1">
            카카오톡 알림톡 발송 서비스가 연동되었습니다.
          </p>
        </div>
      </div>

      {/* 발송 내역 테이블 */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 text-zinc-400 animate-spin" />
          </div>
        ) : history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <MessageSquare className="w-10 h-10 text-zinc-700 mb-4" />
            <p className="text-zinc-400 mb-1">발송 내역이 없습니다</p>
            <p className="text-sm text-zinc-500 mb-6">
              카카오톡 메시지를 발송하면 여기에 표시됩니다.
            </p>
            <Link href="/admin/messages/compose">
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                첫 메시지 보내기
              </Button>
            </Link>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-zinc-800 hover:bg-transparent">
                <TableHead className="text-zinc-400">발송일시</TableHead>
                <TableHead className="text-zinc-400">수신자</TableHead>
                <TableHead className="text-zinc-400">템플릿</TableHead>
                <TableHead className="text-zinc-400">메시지</TableHead>
                <TableHead className="text-zinc-400">상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => {
                const status = statusConfig[item.status] || statusConfig.pending
                const StatusIcon = status.icon

                return (
                  <TableRow
                    key={item.id}
                    className="border-zinc-800 hover:bg-zinc-800/50"
                  >
                    <TableCell className="text-zinc-400 text-sm">
                      {new Date(item.created_at).toLocaleString('ko-KR')}
                    </TableCell>
                    <TableCell className="text-zinc-100">
                      <span className="text-sm">
                        {item.recipient_count}명
                      </span>
                    </TableCell>
                    <TableCell className="text-zinc-400 text-sm">
                      {templateLabels[item.template_id] || item.template_id}
                    </TableCell>
                    <TableCell className="text-zinc-400 text-sm max-w-[200px] truncate">
                      {item.content}
                    </TableCell>
                    <TableCell>
                      <span className={cn(
                        'inline-flex items-center gap-1.5 px-2 py-1 rounded text-xs',
                        status.color
                      )}>
                        <StatusIcon className="w-3 h-3" />
                        {status.label}
                      </span>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  )
}
