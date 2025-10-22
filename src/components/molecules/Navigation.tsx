/**
 * Navigation Component (Molecule)
 * 네비게이션 링크 목록
 */

'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

import { NAVIGATION_ITEMS } from '@/lib/constants'
import type { Language } from '@/types'
import type { BaseProps } from '@/types/components'

interface NavigationProps extends BaseProps {
  mobile?: boolean
  language: Language
  onNavigate?: () => void
}

export function Navigation({
  mobile = false,
  language,
  onNavigate,
  className,
}: NavigationProps) {
  const pathname = usePathname()

  const handleClick = () => {
    if (onNavigate) {
      onNavigate()
    }
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <nav
      className={cn(
        mobile
          ? 'flex flex-col gap-4'
          : 'hidden lg:flex items-center gap-10',
        className
      )}
    >
      {NAVIGATION_ITEMS.map((item) => {
        const isActive = pathname === item.href
        const label = item.label[language]

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={handleClick}
            className={cn(
              'tracking-wide transition-colors font-medium',
              mobile ? 'text-base text-left' : 'text-lg',
              isActive ? 'text-black' : 'text-gray-700 hover:text-black'
            )}
          >
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
