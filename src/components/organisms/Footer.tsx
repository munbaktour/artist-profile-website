/**
 * Footer Component (Organism)
 * 전역 푸터 - 갤러리 정보, 링크, 저작권
 */

'use client'

import Link from 'next/link'
import { Instagram } from 'lucide-react'
import { cn } from '@/lib/utils'

import { GALLERY_INFO, SOCIAL_LINKS } from '@/lib/constants'
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
      <div className="max-w-7xl mx-auto px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Left Column - Gallery Info (2 columns wide) */}
          <div className="md:col-span-2 space-y-2">
            <h3 className="text-lg font-semibold tracking-wider mb-4">
              {GALLERY_INFO.NAME}
            </h3>
            <p className="text-sm text-gray-600">{address}</p>
            <p className="text-sm text-gray-600">
              <a
                href={`tel:${GALLERY_INFO.PHONE}`}
                className="hover:text-gray-900 transition-colors"
              >
                {GALLERY_INFO.PHONE}
              </a>
            </p>
            <p className="text-sm text-gray-600">
              <a
                href={`mailto:${GALLERY_INFO.EMAIL}`}
                className="hover:text-gray-900 transition-colors"
              >
                {GALLERY_INFO.EMAIL}
              </a>
            </p>
          </div>

          {/* Middle Column - Empty spacer */}
          <div className="hidden md:block md:col-span-1" />

          {/* Right Column - Social Media */}
          <div className="md:col-span-1 space-y-4 md:text-right">
            <h3 className="text-lg font-semibold tracking-wider">
              {language === 'ko' ? '소셜 미디어' : 'Follow Us'}
            </h3>
            <div className="flex gap-4 md:justify-end">
              <a
                href={SOCIAL_LINKS.INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="w-6 h-6 flex items-center justify-center hover:opacity-70 transition-opacity"
                aria-label="Instagram"
              >
                <Instagram size={24} />
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
