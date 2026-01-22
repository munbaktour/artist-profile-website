'use client'

import { cn } from '@/lib/utils'
import type { StatCardsGridProps, StatItem } from '@/types/components'

/**
 * StatCardsGrid - 통계 카드 그리드
 *
 * 어드민 대시보드에서 주요 지표를 카드 형태로 표시
 *
 * @example
 * ```tsx
 * <StatCardsGrid
 *   stats={[
 *     { label: '전체', value: 150, icon: Users, color: '#D4AF37' },
 *     { label: 'VIP', value: 25, icon: Crown, color: '#D4AF37' },
 *   ]}
 *   columns={4}
 * />
 * ```
 */
export function StatCardsGrid({ stats, columns = 4, className }: StatCardsGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-3',
    4: 'grid-cols-2 sm:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-5 mb-8', gridCols[columns], className)}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}

/**
 * StatCard - 개별 통계 카드
 */
function StatCard({ label, value, color = '#D4AF37', icon: Icon }: StatItem) {
  return (
    <div
      className="flex items-center gap-4 p-6 rounded-lg transition-all hover:bg-white/[0.02]"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(212,175,55,0.2)',
      }}
    >
      {Icon && (
        <div
          className="p-3 rounded-lg"
          style={{ background: `${color}15` }}
        >
          <Icon size={24} style={{ color }} />
        </div>
      )}
      <div>
        <div className="text-3xl font-light text-[#f0f0f0]">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        <div
          className="text-xs tracking-[1px]"
          style={{ color: 'rgba(255,255,255,0.5)' }}
        >
          {label}
        </div>
      </div>
    </div>
  )
}
