'use client'

import Link from 'next/link'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ADMIN_TYPE } from './typography'
import type { AdminPageHeaderProps } from '@/types/components'

/**
 * 모든 어드민 화면의 제목 영역.
 *
 * 이전 버전은 sticky에 자체 px-6/mb-6을 들고 있었다. 레이아웃(admin/layout.tsx)이
 * 이미 좌우 여백과 상단 여백을 주고 있어서 안쪽에서 한 번 더 주면 제목만 어긋났고,
 * 그래서 아무도 쓰지 않고 페이지마다 직접 만들어 썼다.
 * 여백을 레이아웃에 맡기고 세로 간격만 page 쪽 space-y가 처리하도록 바꿨다.
 */
export function AdminPageHeader({
  title,
  subtitle,
  actionButton,
  actions,
  backHref,
  onBack,
  className,
}: AdminPageHeaderProps) {
  const ActionIcon = actionButton?.icon
  const backClass =
    'p-2 -ml-2 mt-0.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition-colors shrink-0'
  // 버튼이 좁은 화면에서는 가로폭을 채우고, 넓어지면 내용만큼만 차지한다
  const actionClass =
    'flex items-center justify-center gap-2 w-full sm:w-auto px-4 py-2 rounded-lg ' +
    'bg-[#D4AF37] hover:bg-[#C49B30] text-zinc-950 text-sm font-medium shadow-sm transition-colors'

  return (
    <div
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    >
      <div className="flex items-start gap-3 min-w-0">
        {backHref ? (
          <Link href={backHref} aria-label="뒤로" className={backClass}>
            <ArrowLeft className="w-5 h-5" />
          </Link>
        ) : onBack ? (
          <button onClick={onBack} aria-label="뒤로" className={backClass}>
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : null}
        <div className="min-w-0">
          <h1 className={ADMIN_TYPE.pageTitle}>{title}</h1>
          {subtitle && <p className={ADMIN_TYPE.pageSubtitle}>{subtitle}</p>}
        </div>
      </div>

      {(actions || actionButton) && (
        <div className="flex items-center gap-3 shrink-0">
          {actions}
          {actionButton &&
            (actionButton.href ? (
              <Link href={actionButton.href} className={actionClass}>
                {ActionIcon && <ActionIcon size={16} />}
                {actionButton.label}
              </Link>
            ) : (
              <button onClick={actionButton.onClick} className={actionClass}>
                {ActionIcon && <ActionIcon size={16} />}
                {actionButton.label}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}

export interface RefreshButtonProps {
  onClick: () => void
  loading?: boolean
  disabled?: boolean
}

export function RefreshButton({ onClick, loading, disabled }: RefreshButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      aria-label="새로고침"
      className="p-2 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition-colors disabled:opacity-50"
    >
      <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
    </button>
  )
}
