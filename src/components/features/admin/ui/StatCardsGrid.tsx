'use client'

import { cn } from '@/lib/utils'
import type { StatCardsGridProps, StatItem } from '@/types/components'

export function StatCardsGrid({ stats, columns = 4, className }: StatCardsGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-4 mb-6', gridCols[columns], className)}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}

function StatCard({ label, value, color, icon: Icon }: StatItem) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-lg bg-zinc-900 border border-zinc-800">
      {Icon && (
        <Icon size={20} className="flex-shrink-0 text-zinc-400" style={color ? { color } : undefined} />
      )}
      <div>
        <div className="text-2xl font-semibold text-zinc-100">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        <div className="text-xs text-zinc-500 mt-0.5">
          {label}
        </div>
      </div>
    </div>
  )
}
