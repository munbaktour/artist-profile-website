/**
 * Logo Component (Atom)
 * 갤러리 로고 - 클릭 시 홈으로 이동
 */

import Link from 'next/link'
import { cn } from '@/lib/utils'

import type { BaseProps } from '@/types/components'

interface LogoProps extends BaseProps {
  onClick?: () => void
}

export function Logo({ className, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={cn(
        'tracking-wider hover:text-gray-600 transition-colors text-base font-medium',
        className
      )}
    >
      KWANHOONARTE
    </Link>
  )
}
