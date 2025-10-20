/**
 * LayoutContent Component
 * Header와 Footer를 포함하는 레이아웃 래퍼
 */

'use client'

import { useLanguage } from '@/hooks/useLanguage'
import { Header } from './Header'
import { Footer } from './Footer'

interface LayoutContentProps {
  children: React.ReactNode
}

export function LayoutContent({ children }: LayoutContentProps) {
  const { language, setLanguage } = useLanguage()

  return (
    <>
      <Header
        language={language}
        onLanguageChange={setLanguage}
      />

      {/* Main Content with padding-top for fixed header */}
      <main className="min-h-screen pt-[80px]">
        {children}
      </main>

      <Footer language={language} />
    </>
  )
}
