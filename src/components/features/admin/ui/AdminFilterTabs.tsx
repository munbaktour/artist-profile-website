'use client'

import { cn } from '@/lib/utils'
import type { AdminFilterTabsProps } from '@/types/components'

/**
 * AdminFilterTabs - 어드민 필터 탭
 *
 * 골드 테마의 필터 탭 컴포넌트
 *
 * @example
 * ```tsx
 * <AdminFilterTabs
 *   tabs={[
 *     { id: 'all', label: '전체' },
 *     { id: 'vip', label: 'VIP', color: '#D4AF37' },
 *   ]}
 *   activeTab={activeTab}
 *   onTabChange={setActiveTab}
 * />
 * ```
 */
export function AdminFilterTabs({
  tabs,
  activeTab,
  onTabChange,
  variant = 'pill',
  className,
}: AdminFilterTabsProps) {
  return (
    <div className={cn('flex gap-3 flex-wrap', className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id
        const Icon = tab.icon

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'px-5 py-2.5 text-sm transition-all flex items-center gap-2',
              variant === 'pill' && 'rounded-full',
              variant === 'default' && 'rounded-lg'
            )}
            style={{
              background: isActive
                ? 'linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(212,175,55,0.1) 100%)'
                : 'transparent',
              border: `1px solid ${isActive ? '#D4AF37' : 'rgba(255,255,255,0.1)'}`,
              color: isActive ? '#D4AF37' : 'rgba(255,255,255,0.6)',
            }}
          >
            {Icon && (
              <Icon
                size={16}
                style={{ color: isActive ? (tab.color || '#D4AF37') : 'inherit' }}
              />
            )}
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

/**
 * FilterDivider - 필터 그룹 구분선
 */
export function FilterDivider() {
  return (
    <div
      style={{
        width: '1px',
        background: 'rgba(212,175,55,0.2)',
        margin: '0 8px',
        alignSelf: 'stretch',
      }}
    />
  )
}
