/**
 * Header Component (Organism)
 * 전역 헤더 - Logo, Navigation, Language Switcher 조합
 */

'use client'

import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Logo } from '@/components/atoms/Logo'
import { Navigation } from '@/components/molecules/Navigation'
import { LanguageSwitcher } from '@/components/molecules/LanguageSwitcher'

import type { Language } from '@/types'
import type { HeaderProps } from '@/types/components'

interface HeaderComponentProps extends HeaderProps {
  language: Language
  onLanguageChange: (lang: Language) => void
}

export function Header({
  transparent = false,
  fixed = true,
  language,
  onLanguageChange,
  className,
}: HeaderComponentProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 모바일 메뉴 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const closeMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={cn(
        'top-0 left-0 right-0 z-50 transition-all duration-300',
        fixed ? 'fixed' : 'relative',
        scrolled && !transparent
          ? 'bg-white border-b border-gray-200'
          : 'bg-white/95 backdrop-blur-sm',
        className
      )}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo onClick={closeMobileMenu} />

          {/* Desktop Navigation & Language Switcher - Right Aligned */}
          <div className="hidden lg:flex items-center gap-8 ml-auto">
            <Navigation language={language} />
            <LanguageSwitcher
              currentLanguage={language}
              onLanguageChange={onLanguageChange}
            />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-6 pb-4">
            <Navigation
              mobile
              language={language}
              onNavigate={closeMobileMenu}
            />

            {/* Mobile Language Switcher */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <LanguageSwitcher
                currentLanguage={language}
                onLanguageChange={onLanguageChange}
                className="text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
