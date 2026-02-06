'use client'

import { cn } from '@/lib/utils'
import { Crown } from 'lucide-react'

// ============================================
// New VIP Badge (Boolean-based)
// ============================================
interface VipBadgeProps {
  isVip: boolean
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
  className?: string
}

export function VipBadge({
  isVip,
  size = 'md',
  showIcon = true,
  className,
}: VipBadgeProps) {
  if (!isVip) return null

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs gap-1',
    md: 'px-3 py-1 text-sm gap-1.5',
    lg: 'px-4 py-1.5 text-base gap-2',
  }

  const iconSizes = {
    sm: 10,
    md: 12,
    lg: 14,
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-full',
        'bg-[#D4AF37]',
        'text-black',
        sizeStyles[size],
        className
      )}
    >
      {showIcon && <Crown size={iconSizes[size]} className="shrink-0" />}
      VIP
    </span>
  )
}

// ============================================
// VIP Indicator (Dot style for compact displays)
// ============================================
interface VipIndicatorProps {
  isVip: boolean
  className?: string
}

export function VipIndicator({ isVip, className }: VipIndicatorProps) {
  if (!isVip) return null

  return (
    <span
      className={cn(
        'inline-block w-2 h-2 rounded-full',
        'bg-[#D4AF37]',
        className
      )}
      title="VIP"
    />
  )
}

// ============================================
// Legacy VIP Badge (Tier-based) - For backward compatibility
// ============================================
import type { VipTier } from '@/types/admin'

interface LegacyVipBadgeProps {
  tier: VipTier | null
  size?: 'sm' | 'md'
}

const tierStyles: Record<VipTier, { bg: string; text: string; label: string }> = {
  platinum: {
    bg: 'bg-gradient-to-r from-slate-300 to-slate-400',
    text: 'text-slate-900',
    label: 'Platinum',
  },
  gold: {
    bg: 'bg-gradient-to-r from-yellow-400 to-amber-500',
    text: 'text-amber-900',
    label: 'Gold',
  },
  silver: {
    bg: 'bg-gradient-to-r from-gray-300 to-gray-400',
    text: 'text-gray-800',
    label: 'Silver',
  },
  bronze: {
    bg: 'bg-gradient-to-r from-orange-400 to-orange-500',
    text: 'text-orange-900',
    label: 'Bronze',
  },
  standard: {
    bg: 'bg-zinc-800',
    text: 'text-zinc-400',
    label: 'Standard',
  },
}

export function LegacyVipBadge({ tier, size = 'md' }: LegacyVipBadgeProps) {
  if (!tier) return null

  const style = tierStyles[tier]

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        style.bg,
        style.text,
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      )}
    >
      {style.label}
    </span>
  )
}
