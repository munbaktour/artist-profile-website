'use client'

import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { AdminEmptyStateProps } from '@/types/components'

/**
 * 목록이 비었을 때 보여주는 화면.
 *
 * 이전 버전은 아이콘이 zinc-700(배경 대비 1.6:1)이라 거의 보이지 않았고,
 * 제목과 설명이 같은 색·같은 크기라 무엇을 먼저 읽어야 할지 알 수 없었다.
 * 아이콘을 원형 배경에 담아 시선이 머물 지점을 만들고, 제목·설명·행동 순으로
 * 위계를 줬다.
 */
export function AdminEmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: AdminEmptyStateProps) {
  const ActionIcon = action?.icon
  // 빈 화면에서는 이 버튼이 유일한 다음 행동이므로 주요 버튼으로 둔다
  const actionClass =
    'inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-lg ' +
    'bg-[#D4AF37] hover:bg-[#C49B30] text-zinc-950 text-sm font-medium shadow-sm transition-colors'

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center px-6 py-24 text-center',
        className
      )}
    >
      <div className="w-14 h-14 rounded-full bg-zinc-800/60 flex items-center justify-center mb-5">
        <Icon className="w-6 h-6 text-zinc-400" />
      </div>
      <p className="text-base font-medium text-zinc-100">{title}</p>
      {description && (
        <p className="text-sm text-zinc-400 mt-1.5 max-w-sm">{description}</p>
      )}
      {action &&
        (action.href ? (
          <Link href={action.href} className={actionClass}>
            {ActionIcon && <ActionIcon size={16} />}
            {action.label}
          </Link>
        ) : (
          <button onClick={action.onClick} className={actionClass}>
            {ActionIcon && <ActionIcon size={16} />}
            {action.label}
          </button>
        ))}
    </div>
  )
}
