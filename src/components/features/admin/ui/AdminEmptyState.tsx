'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { AdminEmptyStateProps } from '@/types/components'

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
        className="mx-auto mb-4 text-zinc-700"
      />
      <p className="text-zinc-400">{title}</p>
      {description && (
        <p className="text-sm mt-1 text-zinc-500">
          {description}
        </p>
      )}
      {action && (
        action.href ? (
          <Link
            href={action.href}
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-sm border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            {ActionIcon && <ActionIcon size={16} />}
            {action.label}
          </Link>
        ) : (
          <button
            onClick={action.onClick}
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg text-sm border border-zinc-700 text-zinc-300 hover:bg-zinc-800 transition-colors"
          >
            {ActionIcon && <ActionIcon size={16} />}
            {action.label}
          </button>
        )
      )}
    </div>
  )
}
