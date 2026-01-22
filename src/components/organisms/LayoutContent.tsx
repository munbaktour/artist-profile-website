/**
 * LayoutContent Component
 * Header와 Footer를 포함하는 레이아웃 래퍼
 * /admin 경로에서는 헤더/푸터 제외
 */

'use client'

import { usePathname } from 'next/navigation'
import { useLanguage } from '@/hooks/useLanguage'
import { Header } from './Header'
import { Footer } from './Footer'
import ExhibitionPopup from './ExhibitionPopup'

interface LayoutContentProps {
  children: React.ReactNode
}

export function LayoutContent({ children }: LayoutContentProps) {
  const pathname = usePathname()
  const { language, setLanguage } = useLanguage()

  // /admin 경로에서는 갤러리 헤더/푸터 제외
  const isAdminPage = pathname?.startsWith('/admin')

  if (isAdminPage) {
    return <>{children}</>
  }

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

      {/* 전시 팝업 */}
      <ExhibitionPopup />
    </>
  )
}
