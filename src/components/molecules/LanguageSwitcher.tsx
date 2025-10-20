/**
 * LanguageSwitcher Component (Molecule)
 * 언어 전환 컴포넌트 (KR/EN)
 */

'use client'

import { cn } from '@/lib/utils'

import type { Language } from '@/types'
import type { LanguageSwitcherProps } from '@/types/components'

export function LanguageSwitcher({
  currentLanguage,
  onLanguageChange,
  className,
}: LanguageSwitcherProps) {
  return (
    <div
      className={cn(
        'flex items-center gap-2 text-xs tracking-wider',
        className
      )}
    >
      <button
        onClick={() => onLanguageChange('ko')}
        className={cn(
          'transition-colors',
          currentLanguage === 'ko'
            ? 'text-black font-bold'
            : 'text-gray-400 hover:text-gray-600'
        )}
        aria-label="한국어로 전환"
      >
        KR
      </button>
      <span className="text-gray-300">|</span>
      <button
        onClick={() => onLanguageChange('en')}
        className={cn(
          'transition-colors',
          currentLanguage === 'en'
            ? 'text-black font-bold'
            : 'text-gray-400 hover:text-gray-600'
        )}
        aria-label="Switch to English"
      >
        EN
      </button>
    </div>
  )
}
