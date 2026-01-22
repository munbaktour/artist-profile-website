'use client'

import { cn } from '@/lib/utils'
import type { AdminSkeletonProps } from '@/types/components'

/**
 * AdminSkeleton - 로딩 스켈레톤
 *
 * 다양한 변형을 지원하는 어드민용 스켈레톤 컴포넌트
 *
 * @example
 * ```tsx
 * <AdminSkeleton variant="card" count={4} columns={4} />
 * <AdminSkeleton variant="list-item" count={5} />
 * <AdminSkeleton variant="table-row" count={10} />
 * ```
 */
export function AdminSkeleton({
  count = 3,
  variant,
  columns = 1,
  className,
}: AdminSkeletonProps) {
  const gridCols = {
    1: '',
    2: 'grid grid-cols-1 sm:grid-cols-2',
    3: 'grid grid-cols-1 sm:grid-cols-3',
    4: 'grid grid-cols-2 sm:grid-cols-4',
  }

  const renderSkeleton = (index: number) => {
    switch (variant) {
      case 'stat':
        return <StatSkeleton key={index} />
      case 'card':
        return <CardSkeleton key={index} />
      case 'list-item':
        return <ListItemSkeleton key={index} />
      case 'table-row':
        return <TableRowSkeleton key={index} />
      default:
        return <ListItemSkeleton key={index} />
    }
  }

  return (
    <div className={cn(gridCols[columns], 'gap-5', className)}>
      {Array.from({ length: count }).map((_, i) => renderSkeleton(i))}
    </div>
  )
}

/**
 * StatSkeleton - 통계 카드 스켈레톤
 */
function StatSkeleton() {
  return (
    <div
      className="flex items-center gap-4 p-6 rounded-lg animate-pulse"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(212,175,55,0.1)',
      }}
    >
      <div className="w-12 h-12 rounded-lg bg-[#262626]" />
      <div className="space-y-2">
        <div className="h-8 w-16 bg-[#262626] rounded" />
        <div className="h-3 w-20 bg-[#262626] rounded" />
      </div>
    </div>
  )
}

/**
 * CardSkeleton - 카드 스켈레톤
 */
function CardSkeleton() {
  return (
    <div
      className="p-5 rounded-lg animate-pulse"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(212,175,55,0.1)',
      }}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#262626]" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-[#262626] rounded" />
          <div className="h-3 w-24 bg-[#262626] rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-[#262626] rounded" />
        <div className="h-3 w-3/4 bg-[#262626] rounded" />
      </div>
    </div>
  )
}

/**
 * ListItemSkeleton - 리스트 아이템 스켈레톤
 */
function ListItemSkeleton() {
  return (
    <div className="flex items-center justify-between py-4 px-5 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-[#262626]" />
        <div className="space-y-2">
          <div className="h-4 w-48 bg-[#262626] rounded" />
          <div className="h-3 w-32 bg-[#262626] rounded" />
        </div>
      </div>
      <div className="h-6 w-20 bg-[#262626] rounded" />
    </div>
  )
}

/**
 * TableRowSkeleton - 테이블 행 스켈레톤
 */
function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3 px-4 animate-pulse">
      <div className="w-4 h-4 rounded bg-[#262626]" />
      <div className="flex-1 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-[#262626]" />
        <div className="flex-1 space-y-1">
          <div className="h-4 w-32 bg-[#262626] rounded" />
          <div className="h-3 w-48 bg-[#262626] rounded" />
        </div>
      </div>
      <div className="h-6 w-16 bg-[#262626] rounded-full" />
      <div className="h-8 w-8 bg-[#262626] rounded" />
    </div>
  )
}
