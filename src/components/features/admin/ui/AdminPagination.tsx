'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AdminPaginationProps } from '@/types/components'

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
        'flex items-center justify-between mt-8 pt-6 border-t border-zinc-800',
        className
      )}
    >
      <p className="text-sm text-zinc-500">
        {startItem} - {endItem} / {total}
      </p>
      <div className="flex items-center gap-3">
        <button
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
          className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-30"
        >
          <ChevronLeft size={16} />
        </button>
        <span className="text-sm px-3 text-zinc-400">
          {page} / {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
          className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:text-zinc-200 transition-colors disabled:opacity-30"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}
