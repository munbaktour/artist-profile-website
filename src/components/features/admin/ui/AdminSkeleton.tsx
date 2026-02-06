'use client'

import { cn } from '@/lib/utils'
import type { AdminSkeletonProps } from '@/types/components'

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
    <div className={cn(gridCols[columns], 'gap-4', className)}>
      {Array.from({ length: count }).map((_, i) => renderSkeleton(i))}
    </div>
  )
}

function StatSkeleton() {
  return (
    <div className="flex items-center gap-4 p-5 rounded-lg bg-zinc-900 border border-zinc-800 animate-pulse">
      <div className="w-5 h-5 rounded bg-zinc-800" />
      <div className="space-y-2">
        <div className="h-7 w-14 bg-zinc-800 rounded" />
        <div className="h-3 w-16 bg-zinc-800 rounded" />
      </div>
    </div>
  )
}

function CardSkeleton() {
  return (
    <div className="p-5 rounded-lg bg-zinc-900 border border-zinc-800 animate-pulse">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-10 h-10 rounded-full bg-zinc-800" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-32 bg-zinc-800 rounded" />
          <div className="h-3 w-24 bg-zinc-800 rounded" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 w-full bg-zinc-800 rounded" />
        <div className="h-3 w-3/4 bg-zinc-800 rounded" />
      </div>
    </div>
  )
}

function ListItemSkeleton() {
  return (
    <div className="flex items-center justify-between py-4 px-5 animate-pulse">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-zinc-800" />
        <div className="space-y-2">
          <div className="h-4 w-48 bg-zinc-800 rounded" />
          <div className="h-3 w-32 bg-zinc-800 rounded" />
        </div>
      </div>
      <div className="h-6 w-20 bg-zinc-800 rounded" />
    </div>
  )
}

function TableRowSkeleton() {
  return (
    <div className="flex items-center gap-4 py-3 px-4 animate-pulse">
      <div className="w-4 h-4 rounded bg-zinc-800" />
      <div className="flex-1 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-zinc-800" />
        <div className="flex-1 space-y-1">
          <div className="h-4 w-32 bg-zinc-800 rounded" />
          <div className="h-3 w-48 bg-zinc-800 rounded" />
        </div>
      </div>
      <div className="h-6 w-16 bg-zinc-800 rounded-full" />
      <div className="h-8 w-8 bg-zinc-800 rounded" />
    </div>
  )
}
