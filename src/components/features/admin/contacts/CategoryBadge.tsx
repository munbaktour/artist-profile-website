'use client'

import { cn } from '@/lib/utils'
import type { Category } from '@/types/admin'

interface CategoryBadgeProps {
  category: Category | null | undefined
  size?: 'sm' | 'md'
  showIcon?: boolean
  className?: string
}

export function CategoryBadge({
  category,
  size = 'md',
  showIcon = false,
  className,
}: CategoryBadgeProps) {
  if (!category) {
    return (
      <span
        className={cn(
          'inline-flex items-center font-medium rounded-full',
          'bg-zinc-800 text-zinc-400',
          size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
          className
        )}
      >
        미분류
      </span>
    )
  }

  // Calculate contrasting text color based on background
  const getContrastColor = (hexColor: string): string => {
    // Remove # if present
    const hex = hexColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5 ? '#000000' : '#ffffff'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full gap-1',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        className
      )}
      style={{
        backgroundColor: `${category.color}20`,
        color: category.color,
        border: `1px solid ${category.color}40`,
      }}
    >
      {showIcon && category.icon && (
        <span className="text-xs">{category.icon}</span>
      )}
      {category.name}
    </span>
  )
}

// Variant with solid background
export function CategoryBadgeSolid({
  category,
  size = 'md',
  className,
}: Omit<CategoryBadgeProps, 'showIcon'>) {
  if (!category) {
    return (
      <span
        className={cn(
          'inline-flex items-center font-medium rounded-full',
          'bg-zinc-800 text-zinc-400',
          size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
          className
        )}
      >
        미분류
      </span>
    )
  }

  const getContrastColor = (hexColor: string): string => {
    const hex = hexColor.replace('#', '')
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    return luminance > 0.5 ? '#000000' : '#ffffff'
  }

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full',
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm',
        className
      )}
      style={{
        backgroundColor: category.color,
        color: getContrastColor(category.color),
      }}
    >
      {category.name}
    </span>
  )
}
