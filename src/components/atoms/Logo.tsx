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
        'tracking-tight hover:text-gray-600 transition-colors text-2xl font-bold text-black',
        className
      )}
    >
      KWANHOONARTE
    </Link>
  )
}
