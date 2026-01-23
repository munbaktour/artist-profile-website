'use client'

import { useState } from 'react'
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
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock 발송 내역 데이터
interface MessageHistory {
  id: string
  sentAt: string
  template: string
  recipientType: string
  recipientCount: number
  content: string
  status: 'sent' | 'failed' | 'pending'
}

const mockHistory: MessageHistory[] = [
  // 빈 배열 - 실제 발송 내역이 없으므로
]

// 상태별 스타일
const statusConfig = {
  sent: { label: '발송 완료', icon: CheckCircle2, color: 'text-green-400 bg-green-500/10' },
  failed: { label: '발송 실패', icon: XCircle, color: 'text-red-400 bg-red-500/10' },
  pending: { label: '대기 중', icon: Clock, color: 'text-yellow-400 bg-yellow-500/10' },
}

export default function MessagesPage() {
  const [history] = useState<MessageHistory[]>(mockHistory)

  // 통계 (mock)
  const stats = [
    { label: '총 발송', value: 0, icon: Send, color: 'text-blue-400 bg-blue-500/10' },
    { label: '발송 성공', value: 0, icon: CheckCircle2, color: 'text-green-400 bg-green-500/10' },
    { label: '발송 실패', value: 0, icon: XCircle, color: 'text-red-400 bg-red-500/10' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">메시지 발송</h1>
          <p className="text-[#a1a1aa] text-sm mt-1">
            카카오톡 알림톡/친구톡 발송 내역을 관리합니다.
          </p>
        </div>
        <Link href="/admin/messages/compose">
          <Button className="bg-[#FEE500] hover:bg-[#FDD835] text-[#3C1E1E] font-medium">
            <Plus className="w-4 h-4 mr-2" />
            새 메시지
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div
              key={stat.label}
              className="bg-[#1a1a1a] rounded-lg border border-[#262626] p-4 flex items-center gap-4"
            >
              <div className={cn('p-2.5 rounded-lg', stat.color.split(' ')[1])}>
                <Icon className={cn('w-5 h-5', stat.color.split(' ')[0])} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-[#52525b]">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* NHN Cloud 안내 */}
      <div className="p-4 rounded-lg bg-yellow-500/5 border border-yellow-500/20 flex items-start gap-3">
        <MessageSquare className="w-5 h-5 text-yellow-400/80 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-yellow-400/80 font-medium">NHN Cloud 인증 대기 중</p>
          <p className="text-xs text-yellow-400/60 mt-1">
            카카오톡 발송 서비스(알림톡/친구톡) 인증이 완료되면 실제 메시지 발송이 가능합니다.
          </p>
        </div>
      </div>

      {/* 발송 내역 테이블 */}
      <div className="bg-[#1a1a1a] rounded-lg border border-[#262626] overflow-hidden">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="p-4 rounded-full bg-[#262626] mb-4">
              <MessageSquare className="w-8 h-8 text-[#52525b]" />
            </div>
            <p className="text-[#a1a1aa] mb-1">발송 내역이 없습니다</p>
            <p className="text-sm text-[#52525b] mb-6">
              카카오톡 메시지를 발송하면 여기에 표시됩니다.
            </p>
            <Link href="/admin/messages/compose">
              <Button
                variant="outline"
                className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37]/10"
              >
                <Plus className="w-4 h-4 mr-2" />
                첫 메시지 보내기
              </Button>
            </Link>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="border-[#262626] hover:bg-transparent">
                <TableHead className="text-[#a1a1aa]">발송일시</TableHead>
                <TableHead className="text-[#a1a1aa]">대상</TableHead>
                <TableHead className="text-[#a1a1aa]">템플릿</TableHead>
                <TableHead className="text-[#a1a1aa]">메시지</TableHead>
                <TableHead className="text-[#a1a1aa]">상태</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.map((item) => {
                const status = statusConfig[item.status]
                const StatusIcon = status.icon

                return (
                  <TableRow
                    key={item.id}
                    className="border-[#262626] hover:bg-[#262626]/50"
                  >
                    <TableCell className="text-[#a1a1aa] text-sm">
                      {new Date(item.sentAt).toLocaleString('ko-KR')}
                    </TableCell>
                    <TableCell className="text-white">
                      <span className="text-sm">
                        {item.recipientType} ({item.recipientCount}명)
                      </span>
                    </TableCell>
                    <TableCell className="text-[#a1a1aa] text-sm">
                      {item.template}
                    </TableCell>
                    <TableCell className="text-[#a1a1aa] text-sm max-w-[200px] truncate">
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
