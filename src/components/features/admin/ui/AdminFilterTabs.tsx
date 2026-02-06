'use client'

import { cn } from '@/lib/utils'
import type { AdminFilterTabsProps } from '@/types/components'

export function AdminFilterTabs({
  tabs,
  activeTab,
  onTabChange,
  variant = 'pill',
  className,
}: AdminFilterTabsProps) {
  return (
    <div className={cn('flex gap-2 flex-wrap', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        const Icon = tab.icon

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'px-4 py-2 text-sm transition-colors flex items-center gap-2',
              variant === 'pill' && 'rounded-full',
              variant === 'default' && 'rounded-lg',
              isActive
                ? 'bg-zinc-800 text-zinc-100 border border-zinc-700'
                : 'text-zinc-500 border border-transparent hover:text-zinc-300 hover:bg-zinc-800/50'
            )}
          >
            {Icon && <Icon size={14} />}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

export function FilterDivider() {
  return (
    <div className="w-px bg-zinc-800 self-stretch mx-2" />
  )
}
