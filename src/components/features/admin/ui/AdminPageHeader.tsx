'use client'

import Link from 'next/link'
import { ArrowLeft, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { AdminPageHeaderProps } from '@/types/components'

/**
 * AdminPageHeader - 관리자 페이지 상단 헤더
 *
 * 골드 테마(#D4AF37)를 적용한 어드민 페이지 헤더
 *
 * @example
 * ```tsx
 * <AdminPageHeader
 *   title="연락처 관리"
 *   subtitle="Contact Management"
 *   actionButton={{
 *     label: "새 연락처",
 *     icon: Plus,
 *     href: "/admin/contacts/new"
 *   }}
 * />
 * ```
 */
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
        'sticky top-0 z-40 px-6 py-6 mb-8',
        className
      )}
      style={{
        background:
          'linear-gradient(90deg, rgba(212,175,55,0.1) 0%, rgba(0,0,0,0.9) 50%, rgba(212,175,55,0.1) 100%)',
        borderBottom: '1px solid rgba(212,175,55,0.3)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="max-w-[1600px] mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          {backHref && (
            <Link href={backHref}>
              <button
                className="p-2 rounded-lg transition-all hover:bg-white/5"
                style={{ color: '#D4AF37' }}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            </Link>
          )}
          <div>
            <h1
              className="text-2xl font-light tracking-[6px] mb-1"
              style={{ color: '#D4AF37', fontFamily: "'Playfair Display', serif" }}
            >
              {title}
            </h1>
            {subtitle && (
              <p
                className="text-xs tracking-[2px] uppercase"
                style={{ color: 'rgba(212,175,55,0.7)' }}
              >
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
                className="flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm transition-all"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)',
                  color: '#0a0a0a',
                  boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
                }}
              >
                {actionButton.icon && <actionButton.icon size={18} />}
                {actionButton.label}
              </Link>
            ) : (
              <button
                onClick={actionButton.onClick}
                className="flex items-center gap-2 px-6 py-3 rounded font-semibold text-sm transition-all"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #B8960C 100%)',
                  color: '#0a0a0a',
                  boxShadow: '0 4px 15px rgba(212,175,55,0.3)',
                }}
              >
                {actionButton.icon && <actionButton.icon size={18} />}
                {actionButton.label}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  )
}

/**
 * RefreshButton - 새로고침 버튼 (Header의 actions prop에서 사용)
 */
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
      className="p-3 rounded-lg transition-all disabled:opacity-50"
      style={{
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(212,175,55,0.2)',
        color: '#D4AF37',
      }}
    >
      <RefreshCw className={cn('w-5 h-5', loading && 'animate-spin')} />
    </button>
  )
}
