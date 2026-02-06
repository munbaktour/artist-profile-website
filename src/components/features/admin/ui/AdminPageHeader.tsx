'use client'

import Link from 'next/link'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AdminPageHeaderProps } from '@/types/components'

export function AdminPageHeader({
  title,
  subtitle,
  actionButton,
  actions,
  backHref,
  className,
}: AdminPageHeaderProps) {
  return (
    <div
      className={cn(
        'sticky top-0 z-40 px-6 py-4 mb-6 bg-zinc-950 border-b border-zinc-800',
        className
      )}
    >
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          {backHref && (
            <Link href={backHref}>
              <button className="p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
          )}
          <div>
            <h1 className="text-lg font-semibold text-zinc-100">
              {title}
            </h1>
            {subtitle && (
              <p className="text-sm text-zinc-500 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          {actions}
          {actionButton && (
            actionButton.href ? (
              <Link
                href={actionButton.href}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4AF37] text-black text-sm font-medium hover:bg-[#C49B30] transition-colors"
              >
                {actionButton.icon && <actionButton.icon size={16} />}
                {actionButton.label}
              </Link>
            ) : (
              <button
                onClick={actionButton.onClick}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#D4AF37] text-black text-sm font-medium hover:bg-[#C49B30] transition-colors"
              >
                {actionButton.icon && <actionButton.icon size={16} />}
                {actionButton.label}
              </button>
            )
          )}
        </div>
      </div>
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
      className="p-2 rounded-lg bg-zinc-800/50 border border-zinc-700 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors disabled:opacity-50"
    >
      <RefreshCw className={cn('w-4 h-4', loading && 'animate-spin')} />
    </button>
  )
}
