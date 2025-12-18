'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { ArtWork, WorkCategory } from '@/types'
import ArtworkCard from './ArtworkCard'

interface WorkCategorySectionProps {
  category: WorkCategory
  artworks: ArtWork[]
}

export default function WorkCategorySection({ category, artworks }: WorkCategorySectionProps) {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentRef = sectionRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  if (artworks.length === 0) return null

  return (
    <div
      ref={sectionRef}
      className={`mb-16 transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-5'
      }`}
    >
      {/* Category Title */}
      <div className="flex items-center gap-4 mb-8">
        <div className="h-px bg-gray-300 flex-1" />
        <h3 className="text-lg font-medium tracking-wide text-gray-800">
          {category.label[language]}
        </h3>
        <div className="h-px bg-gray-300 flex-1" />
      </div>

      {/* Artworks Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
        {artworks.map((artwork, index) => (
          <ArtworkCard
            key={artwork.id}
            artwork={artwork}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
