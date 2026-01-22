'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AdminPaginationProps } from '@/types/components'

/**
 * AdminPagination - 페이지네이션
 *
 * 어드민 리스트에서 사용하는 페이지네이션 컴포넌트
 *
 * @example
 * ```tsx
 * <AdminPagination
 *   page={currentPage}
 *   totalPages={10}
 *   total={150}
 *   pageSize={20}
 *   onPageChange={setPage}
 * />
 * ```
 */
export function AdminPagination({
  page,
  totalPages,
  total,
  pageSize,
  onPageChange,
  className,
}: AdminPaginationProps) {
  if (totalPages <= 1) return null

  const startItem = (page - 1) * pageSize + 1
  const endItem = Math.min(page * pageSize, total)

  return (
    <div
      className={cn(
        'flex items-center justify-between mt-8 pt-6',
        className
      )}
      style={{ borderTop: '1px solid rgba(212,175,55,0.1)' }}
    >
      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {startItem} - {endItem} / {total}
      </p>
      <div className="flex items-center gap-3">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="p-2 rounded-lg transition-all disabled:opacity-30"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(212,175,55,0.2)',
            color: '#D4AF37',
          }}
        >
          <ChevronLeft size={18} />
        </button>
        <span
          className="text-sm px-3"
          style={{ color: 'rgba(212,175,55,0.8)' }}
        >
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="p-2 rounded-lg transition-all disabled:opacity-30"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(212,175,55,0.2)',
            color: '#D4AF37',
          }}
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  )
}
