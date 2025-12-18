'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { ArtWork } from '@/types'

interface ArtworkCardProps {
  artwork: ArtWork
  index?: number
}

export default function ArtworkCard({ artwork, index = 0 }: ArtworkCardProps) {
  const { language } = useLanguage()
  const cardRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const currentRef = cardRef.current
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 지연 시간 단축: 100ms → 30ms (25개 이미지 최대 0.75초)
            setTimeout(() => {
              setIsVisible(true)
            }, Math.min(index * 30, 300))
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
  }, [index])

  return (
    <div
      ref={cardRef}
      className={`transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      <Link
        href={`/artists/${artwork.artistId}/works/${artwork.id}`}
        className="group block"
      >
        {/* 이미지 컨테이너 - 아라리오 스타일 호버 확대 */}
        <div className="relative aspect-square overflow-hidden bg-gray-50">
          <Image
            src={artwork.image}
            alt={artwork.title[language]}
            width={600}
            height={600}
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>

        {/* 텍스트 정보 - 아라리오 스타일 배치 */}
        <div className="mt-4 space-y-1">
          <h3 className="text-sm font-normal text-gray-900 leading-snug">
            {artwork.title[language]}
          </h3>
          <p className="text-sm text-gray-500">
            {artwork.year}
          </p>
          {artwork.medium && (
            <p className="text-xs text-gray-400">
              {artwork.medium}
            </p>
          )}
        </div>
      </Link>
    </div>
  )
}
