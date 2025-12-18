'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { Artist, ArtWork } from '@/types'
import WorkCategorySection from './WorkCategorySection'
import ArtworkCard from './ArtworkCard'

interface ArtistWorksProps {
  artist: Artist
}

export default function ArtistWorks({ artist }: ArtistWorksProps) {
  const { language } = useLanguage()
  const sectionRef = useRef<HTMLElement>(null)
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
        threshold: 0.05,
        rootMargin: '100px'
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

  const labels = {
    works: { ko: 'Works', en: 'Works' }
  }

  // If no works, don't render the section
  if (!artist.works || artist.works.length === 0) return null

  // Check if artist has work categories
  const hasCategories = artist.workCategories && artist.workCategories.length > 0

  // Group works by category if categories exist
  const getWorksByCategory = (categoryId: string): ArtWork[] => {
    return artist.works?.filter(work => work.category === categoryId) || []
  }

  // Get uncategorized works
  const uncategorizedWorks = artist.works?.filter(work => !work.category) || []

  return (
    <section
      ref={sectionRef}
      id="works"
      className={`py-16 px-6 bg-gray-50 transition-all duration-700 ease-out ${
        isVisible
          ? 'opacity-100'
          : 'opacity-0'
      }`}
    >
      <div className="max-w-[1440px] mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl mb-12 tracking-wider font-light">
          {labels.works[language]}
        </h2>

        {/* Categorized Works */}
        {hasCategories && artist.workCategories?.map((category) => {
          const categoryWorks = getWorksByCategory(category.id)
          if (categoryWorks.length === 0) return null

          return (
            <WorkCategorySection
              key={category.id}
              category={category}
              artworks={categoryWorks}
            />
          )
        })}

        {/* Uncategorized Works (fallback for artists without categories) */}
        {(!hasCategories || uncategorizedWorks.length > 0) && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {(hasCategories ? uncategorizedWorks : artist.works)?.map((artwork, index) => (
              <ArtworkCard
                key={artwork.id}
                artwork={artwork}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
