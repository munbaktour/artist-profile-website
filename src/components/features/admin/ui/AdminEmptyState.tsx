'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { AdminEmptyStateProps } from '@/types/components'

/**
 * AdminEmptyState - 빈 상태 표시
 *
 * 데이터가 없을 때 사용자에게 안내 메시지와 액션을 제공
 *
 * @example
 * ```tsx
 * <AdminEmptyState
 *   icon={Users}
 *   title="연락처가 없습니다"
 *   description="새 연락처를 추가하여 시작하세요."
 *   action={{
 *     label: "연락처 추가",
 *     href: "/admin/contacts/new",
 *     icon: Plus
 *   }}
 * />
 * ```
 */
export function AdminEmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: AdminEmptyStateProps) {
  const ActionIcon = action?.icon

  return (
    <div className={cn('p-16 text-center', className)}>
      <Icon
        size={48}
        className="mx-auto mb-4"
        style={{ color: 'rgba(255,255,255,0.2)' }}
      />
      <p style={{ color: 'rgba(255,255,255,0.5)' }}>{title}</p>
      {description && (
        <p
          className="text-sm mt-1"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          {description}
        </p>
      )}
      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-lg text-sm transition-all hover:bg-white/[0.02]"
            style={{
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.3)',
              color: '#D4AF37',
            }}
          >
            {ActionIcon && <ActionIcon size={16} />}
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 rounded-lg text-sm transition-all hover:bg-white/[0.02]"
            style={{
              background: 'rgba(212,175,55,0.1)',
              border: '1px solid rgba(212,175,55,0.3)',
              color: '#D4AF37',
            }}
          >
            {ActionIcon && <ActionIcon size={16} />}
            {action.label}
          </button>
        )
      )}
    </div>
  )
}
