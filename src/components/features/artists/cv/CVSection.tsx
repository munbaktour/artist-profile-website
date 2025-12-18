'use client'

import type { CVItem, Language } from '@/types'

interface CVSectionProps {
  title: { ko: string; en: string }
  items: CVItem[]
  language: Language
}

export function CVSection({ title, items, language }: CVSectionProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="mb-12">
      {/* Section Title */}
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-sm font-medium tracking-widest text-gray-900">
          {title[language]}
        </h2>
        <div className="flex-1 h-px bg-gray-300" />
      </div>

      {/* Items */}
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex gap-8">
            <span className="w-24 flex-shrink-0 text-sm text-gray-500">
              {item.year}
            </span>
            <div className="flex-1">
              <span className="text-sm text-gray-900">
                {item.title[language]}
              </span>
              {item.subtitle && (
                <span className="text-sm text-gray-500 ml-2">
                  {item.subtitle[language]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
