'use client'

import { cn } from '@/lib/utils'
import type { StatCardsGridProps, StatItem } from '@/types/components'

/**
 * 화면 상단 통계 카드.
 *
 * 바뀐 점 두 가지.
 * 1. columns=4가 grid-cols-2 sm:grid-cols-4였다. 연락처 화면은 md에서 4열로
 *    가는데 sm(640px)에서 이미 4열이 되면 숫자가 눌린다. md로 맞췄다.
 * 2. 아이콘을 사각 배경에 담았다. 아이콘과 숫자가 같은 평면에 떠 있으면
 *    시각적 무게가 비슷해져 숫자가 먼저 읽히지 않는다.
 *
 * 바깥 여백은 쓰는 쪽(space-y)에 맡긴다. 안에서 mb-6을 들고 있던 탓에
 * space-y를 쓰는 화면에서는 간격이 두 번 들어갔다.
 */
export function StatCardsGrid({ stats, columns = 4, className }: StatCardsGridProps) {
  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  }

  return (
    <div className={cn('grid gap-4', gridCols[columns], className)}>
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  )
}

function StatCard({ label, value, color, icon: Icon }: StatItem) {
  return (
    <div className="flex items-center gap-4 p-5 rounded-xl bg-zinc-900 border border-zinc-700">
      {Icon && (
        <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center shrink-0">
          <Icon
            className="w-5 h-5 text-zinc-400"
            style={color ? { color } : undefined}
          />
        </div>
      )}
      <div className="min-w-0">
        <p className="text-2xl font-semibold tabular-nums text-zinc-50 leading-none">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </p>
        <p className="text-xs text-zinc-400 mt-1.5">{label}</p>
      </div>
    </div>
  )
}
