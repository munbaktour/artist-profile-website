'use client'

import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { use, useState, useEffect } from 'react'
import { artistsData } from '@/data/artists'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface PageProps {
  params: Promise<{ id: string }>
}

interface ArtworkImage {
  id: string
  url: string
  index: number
}

export default function ArtistDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const { language } = useLanguage()
  const artist = artistsData.find((a) => a.id === id)
  const [artworkImages, setArtworkImages] = useState<ArtworkImage[]>([])
  const [profileImage, setProfileImage] = useState<string>('')

  useEffect(() => {
    // 프로필 이미지 로드
    const loadProfileImage = async () => {
      const profilePath = `/images/artists/${id}/profile.jpg`
      try {
        const res = await fetch(profilePath, { method: 'HEAD' })
        if (res.ok) {
          setProfileImage(profilePath)
        }
      } catch {
        // Profile image not found, using default
      }
    }

    // 작품 이미지 자동 로드 (artwork-01.jpg, artwork-02.jpg, ...)
    const loadArtworkImages = async () => {
      const images: ArtworkImage[] = []
      let index = 1

      while (index <= 50) { // 최대 50개까지 체크
        const paddedIndex = index.toString().padStart(2, '0')
        const imagePath = `/images/artists/${id}/artwork-${paddedIndex}.jpg`

        try {
          const res = await fetch(imagePath, { method: 'HEAD' })
          if (res.ok) {
            images.push({
              id: `${id}-artwork-${paddedIndex}`,
              url: imagePath,
              index
            })
            index++
          } else {
            break // 이미지가 없으면 중단
          }
        } catch {
          break
        }
      }

      setArtworkImages(images)
    }

    loadProfileImage()
    loadArtworkImages()
  }, [id])

  if (!artist) {
    notFound()
  }

  const breadcrumbs = {
    home: { ko: 'Home', en: 'Home' },
    artists: { ko: 'Artists', en: 'Artists' }
  }

  const labels = {
    bio: { ko: '작가 소개', en: 'About Artist' },
    born: { ko: '년생', en: 'Born' },
    works: { ko: '작품', en: 'Works' },
    inquiryTitle: { ko: '작품 문의', en: 'Artwork Inquiry' },
    inquiryDesc: {
      ko: `${artist.name[language]} 작가의 작품에 대해 더 자세히 알고 싶으시다면 문의해 주세요.`,
      en: `Contact us for more information about ${artist.name[language]}'s artworks.`
    },
    contactUs: { ko: 'CONTACT US', en: 'CONTACT US' }
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="py-6 px-6 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-black">{breadcrumbs.home[language]}</Link>
            <span>/</span>
            <Link href="/artists" className="hover:text-black">{breadcrumbs.artists[language]}</Link>
            <span>/</span>
            <span className="text-black">{artist.name[language]}</span>
          </div>
        </div>
      </div>

      {/* Artist Profile */}
      <section className="py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Artist Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-100 rounded-lg">
              <Image
                src={profileImage || artist.image}
                alt={artist.name[language]}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Artist Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl tracking-wider font-light mb-4">
                  {artist.name[language]}
                </h1>
                <p className="text-xl text-gray-600 mb-2">
                  {artist.name[language === 'ko' ? 'en' : 'ko']}
                </p>
                {artist.birthYear && (
                  <p className="text-gray-600">
                    {language === 'ko'
                      ? `${artist.birthYear}${labels.born[language]} · ${artist.nationality}`
                      : `${labels.born[language]} ${artist.birthYear} · ${artist.nationality}`
                    }
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-medium mb-4 tracking-wide">
                  {labels.bio[language]}
                </h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {artist.bio[language]}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artworks Gallery */}
      {artworkImages.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-[1440px] mx-auto">
            <h2 className="text-3xl mb-12 text-center tracking-wider font-light">
              {labels.works[language]}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {artworkImages.map((artwork) => {
                // artist.works에서 해당 인덱스의 작품 정보 찾기 (있으면 사용)
                const artworkData = artist.works?.[artwork.index - 1]

                return (
                  <div key={artwork.id} className="group">
                    <div className="aspect-[3/4] overflow-hidden rounded-lg bg-gray-100 hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src={artwork.url}
                        alt={artworkData?.title[language] || `Artwork ${artwork.index}`}
                        width={600}
                        height={800}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    {artworkData && (
                      <div className="mt-4 space-y-1">
                        <h3 className="text-lg font-medium tracking-wide">
                          {artworkData.title[language]}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {artworkData.year}, {artworkData.medium}
                        </p>
                        <p className="text-xs text-gray-500">
                          {artworkData.dimensions}
                        </p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-16 px-6 bg-black text-white">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-2xl tracking-wider font-light mb-6">
            {labels.inquiryTitle[language]}
          </h2>
          <p className="mb-8 text-gray-300">
            {labels.inquiryDesc[language]}
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-3 border-2 border-white hover:bg-white hover:text-black transition-all tracking-wider"
          >
            {labels.contactUs[language]}
          </Link>
        </div>
      </section>
    </div>
  )
}
