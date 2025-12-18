'use client'

import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface NavItem {
  id: string
  label: { ko: string; en: string }
  visible: boolean
  type?: 'scroll' | 'link'  // scroll: 섹션으로 스크롤, link: 페이지 이동
  href?: string             // type이 'link'일 때 사용
}

interface ArtistSubNavProps {
  items: NavItem[]
}

export default function ArtistSubNav({ items }: ArtistSubNavProps) {
  const { language } = useLanguage()

  const visibleItems = items.filter(item => item.visible)

  const handleScroll = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const headerOffset = 100
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.scrollY - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className="border-b border-gray-200 py-4">
      <div className="flex items-center gap-6">
        {visibleItems.map((item, index) => (
          <span key={item.id} className="flex items-center">
            {item.type === 'link' && item.href ? (
              <Link
                href={item.href}
                className="text-sm text-gray-600 hover:text-black transition-colors tracking-wide"
              >
                {item.label[language]}
              </Link>
            ) : (
              <button
                onClick={() => handleScroll(item.id)}
                className="text-sm text-gray-600 hover:text-black transition-colors tracking-wide"
              >
                {item.label[language]}
              </button>
            )}
            {index < visibleItems.length - 1 && (
              <span className="ml-6 text-gray-300">|</span>
            )}
          </span>
        ))}
      </div>
    </nav>
  )
}
