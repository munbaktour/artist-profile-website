/**
 * Footer Component (Organism)
 * 전역 푸터 - 갤러리 정보, 링크, 저작권
 */

'use client'

import Link from 'next/link'
import { Instagram, Facebook } from 'lucide-react'
import { cn } from '@/lib/utils'

import { GALLERY_INFO, SOCIAL_LINKS, NAVIGATION_ITEMS } from '@/lib/constants'
import type { Language } from '@/types'
import type { FooterProps } from '@/types/components'

interface FooterComponentProps extends FooterProps {
  language: Language
}

export function Footer({ language, className }: FooterComponentProps) {
  const currentYear = new Date().getFullYear()
  const address = GALLERY_INFO.ADDRESS[language]

  return (
    <footer
      className={cn(
        'bg-gray-50 border-t border-gray-200',
        className
      )}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Gallery Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wider">
              {GALLERY_INFO.NAME}
            </h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p>{address}</p>
              <p>
                <a
                  href={`tel:${GALLERY_INFO.PHONE}`}
                  className="hover:text-gray-900 transition-colors"
                >
                  {GALLERY_INFO.PHONE}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${GALLERY_INFO.EMAIL}`}
                  className="hover:text-gray-900 transition-colors"
                >
                  {GALLERY_INFO.EMAIL}
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wider">
              {language === 'ko' ? '바로가기' : 'Quick Links'}
            </h3>
            <nav className="flex flex-col space-y-2 text-sm">
              {NAVIGATION_ITEMS.slice(0, 4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.label[language]}
                </Link>
              ))}
            </nav>
          </div>

          {/* More Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wider">
              {language === 'ko' ? '정보' : 'Information'}
            </h3>
            <nav className="flex flex-col space-y-2 text-sm">
              {NAVIGATION_ITEMS.slice(4).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.label[language]}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold tracking-wider">
              {language === 'ko' ? '소셜 미디어' : 'Follow Us'}
            </h3>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href={SOCIAL_LINKS.FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>
              © {currentYear} {GALLERY_INFO.NAME}. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link
                href="/privacy"
                className="hover:text-gray-900 transition-colors"
              >
                {language === 'ko' ? '개인정보처리방침' : 'Privacy Policy'}
              </Link>
              <Link
                href="/terms"
                className="hover:text-gray-900 transition-colors"
              >
                {language === 'ko' ? '이용약관' : 'Terms of Service'}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
