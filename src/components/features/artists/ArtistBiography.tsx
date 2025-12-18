'use client'

import Image from 'next/image'
import { Share2 } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import type { Artist } from '@/types'

interface ArtistBiographyProps {
  artist: Artist
}

export default function ArtistBiography({ artist }: ArtistBiographyProps) {
  const { language } = useLanguage()

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: artist.name[language],
          text: artist.bio[language],
          url: window.location.href,
        })
      } catch {
        // Share cancelled or failed
      }
    } else {
      // Fallback: copy URL to clipboard
      await navigator.clipboard.writeText(window.location.href)
      alert(language === 'ko' ? 'URL이 복사되었습니다.' : 'URL copied to clipboard.')
    }
  }

  const labels = {
    born: { ko: '년생', en: 'Born' },
    share: { ko: '공유하기', en: 'Share' }
  }

  // Use featuredImage if available, otherwise fall back to image
  const displayImage = artist.featuredImage || artist.image

  return (
    <section id="biography" className="py-16 px-6">
      <div className="max-w-[1440px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Featured Image */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <Image
                src={displayImage}
                alt={artist.name[language]}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="flex items-center gap-2 text-sm text-gray-600 hover:text-black transition-colors"
            >
              <Share2 className="w-4 h-4" />
              <span>{labels.share[language]}</span>
            </button>
          </div>

          {/* Biography Text */}
          <div className="space-y-6">
            {artist.birthYear && (
              <p className="text-gray-600">
                {language === 'ko'
                  ? `${artist.birthYear}${labels.born[language]} · ${artist.nationality}`
                  : `${labels.born[language]} ${artist.birthYear} · ${artist.nationality}`
                }
              </p>
            )}

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-base">
                {artist.bio[language]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
