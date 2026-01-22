'use client'

import { useState, useEffect } from 'react'
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreHorizontal, Plus, UserPlus, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Admin {
  id: string
  email: string
  fullName: string | null
  role: 'super_admin' | 'admin' | 'manager' | 'director' | 'viewer'
  createdAt: string
}

interface AdminManagementProps {
  canEdit?: boolean
  currentUserId?: string
}

// 역할 표시 매핑
const roleLabels: Record<Admin['role'], string> = {
  super_admin: '최고 관리자',
  admin: '관리자',
  manager: '매니저',
  director: '디렉터',
  viewer: '뷰어',
}

// 역할별 색상
const roleColors: Record<Admin['role'], string> = {
  super_admin: 'bg-purple-500/10 text-purple-400',
  admin: 'bg-blue-500/10 text-blue-400',
  manager: 'bg-amber-500/10 text-amber-400',
  director: 'bg-green-500/10 text-green-400',
  viewer: 'bg-gray-500/10 text-gray-400',
}

// 날짜 포맷팅
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\. /g, '.').replace(/\.$/, '')
}

export function AdminManagement({ canEdit = false, currentUserId }: AdminManagementProps) {
  const [admins, setAdmins] = useState<Admin[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = await fetch('/api/admin/admins')
        const result = await response.json()

        if (!response.ok) {
          throw new Error(result.error || '관리자 목록을 불러오는데 실패했습니다.')
        }

        setAdmins(result.data || [])
      } catch (err) {
        console.error('Error fetching admins:', err)
        setError(err instanceof Error ? err.message : '오류가 발생했습니다.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchAdmins()
  }, [])

  const handleInvite = () => {
    // TODO: 관리자 초대 모달 열기
    console.log('관리자 초대 버튼 클릭')
  }

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-12 bg-[#262626] rounded animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-red-400 mb-2">{error}</p>
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.reload()}
          className="text-[#a1a1aa] border-[#262626]"
        >
          다시 시도
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {admins.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="p-3 rounded-full bg-[#262626] mb-4">
            <UserPlus className="w-6 h-6 text-[#52525b]" />
          </div>
          <p className="text-[#a1a1aa] mb-1">등록된 관리자가 없습니다</p>
          <p className="text-sm text-[#52525b]">
            관리자를 초대하여 시스템을 함께 관리하세요.
          </p>
        </div>
      ) : (
        <div className="rounded-md border border-[#262626] overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="border-[#262626] hover:bg-transparent">
                <TableHead className="text-[#a1a1aa]">이메일</TableHead>
                <TableHead className="text-[#a1a1aa]">이름</TableHead>
                <TableHead className="text-[#a1a1aa]">역할</TableHead>
                <TableHead className="text-[#a1a1aa]">가입일</TableHead>
                {canEdit && (
                  <TableHead className="text-[#a1a1aa] w-[50px]"></TableHead>
                )}
              </TableRow>
            </TableHeader>
            <TableBody>
              {admins.map((admin) => {
                const isCurrentUser = currentUserId === admin.id

                return (
                  <TableRow
                    key={admin.id}
                    className={cn(
                      'border-[#262626] hover:bg-[#262626]/50',
                      isCurrentUser && 'bg-blue-500/5'
                    )}
                  >
                    <TableCell className="text-white font-medium">
                      <div className="flex items-center gap-2">
                        {admin.email}
                        {isCurrentUser && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] bg-blue-500/20 text-blue-400">
                            나
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-[#a1a1aa]">
                      {admin.fullName || '-'}
                    </TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          'px-2 py-1 rounded text-xs',
                          roleColors[admin.role]
                        )}
                      >
                        {roleLabels[admin.role]}
                      </span>
                    </TableCell>
                    <TableCell className="text-[#a1a1aa] text-sm">
                      {formatDate(admin.createdAt)}
                    </TableCell>
                    {canEdit && (
                      <TableCell>
                        {!isCurrentUser && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-[#a1a1aa] hover:text-white hover:bg-[#262626]"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                              align="end"
                              className="bg-[#1a1a1a] border-[#262626]"
                            >
                              <DropdownMenuItem
                                className="text-red-400 focus:text-red-400 focus:bg-red-500/10"
                                onClick={() => {
                                  // TODO: 관리자 삭제 기능
                                  console.log('삭제:', admin.id)
                                }}
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                삭제
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    )}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      )}

      {canEdit && (
        <Button
          onClick={handleInvite}
          className="w-full bg-[#262626] hover:bg-[#363636] text-white border border-[#363636]"
        >
          <Plus className="w-4 h-4 mr-2" />
          관리자 초대
        </Button>
      )}
    </div>
  )
}
