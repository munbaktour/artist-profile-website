/**
 * Logo Component (Atom)
 * 갤러리 로고 - 클릭 시 홈으로 이동
 */

import Link from 'next/link'
import Image from 'next/image'
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
        'flex items-center gap-3 hover:opacity-80 transition-opacity',
        className
      )}
    >
      <Image
        src="/images/logo/logo.png"
        alt="KWANHOON ARTE"
        width={40}
        height={40}
        className="object-contain"
      />
      <span className="tracking-tight text-2xl font-bold text-black">
        KWANHOON ARTE
      </span>
    </Link>
  )
}
