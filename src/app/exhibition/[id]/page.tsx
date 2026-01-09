'use client'

import { useParams, notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { mockExhibitions } from '@/data/exhibitions'
import { artistsData } from '@/data/artists'

export default function ExhibitionDetailPage() {
  const params = useParams()
  const { language } = useLanguage()
  const exhibitionId = params.id as string

  const exhibition = mockExhibitions.find((ex) => ex.id === exhibitionId)

  if (!exhibition) {
    notFound()
  }

  // Get artist names if artistIds exist
  const artistNames = exhibition.artistIds
    ?.map((id) => {
      const artist = artistsData.find((a) => a.id === id)
      return artist?.name[language]
    })
    .filter(Boolean)
    .join(', ')

  // Format date range
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const labels = {
    back: { ko: '전시 목록', en: 'Exhibitions' },
    artist: { ko: '작가', en: 'Artist' },
    period: { ko: '전시 기간', en: 'Period' },
    location: { ko: '장소', en: 'Location' },
    about: { ko: '전시 소개', en: 'About' },
    installationViews: { ko: '전시 전경', en: 'Installation Views' },
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="px-6 py-4 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto">
          <Link
            href="/exhibition"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">{labels.back[language]}</span>
          </Link>
        </div>
      </div>

      {/* Main Image */}
      <section className="relative w-full aspect-[16/9] max-h-[70vh] bg-gray-100">
        <Image
          src={exhibition.posterImage}
          alt={exhibition.title[language]}
          fill
          className="object-contain"
          priority
        />
      </section>

      {/* Exhibition Info */}
      <section className="px-6 py-12">
        <div className="max-w-[800px] mx-auto">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-light tracking-wide mb-4">
            {exhibition.title[language]}
          </h1>

          {/* Meta Info */}
          <div className="space-y-3 text-gray-600 mb-8">
            {artistNames && (
              <p>
                <span className="text-gray-400 mr-2">{labels.artist[language]}</span>
                {artistNames}
              </p>
            )}
            <p>
              <span className="text-gray-400 mr-2">{labels.period[language]}</span>
              {formatDate(exhibition.startDate)} — {formatDate(exhibition.endDate)}
            </p>
            {exhibition.location && (
              <p>
                <span className="text-gray-400 mr-2">{labels.location[language]}</span>
                {exhibition.location[language]}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-sm text-gray-400 uppercase tracking-wider mb-4">
              {labels.about[language]}
            </h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {exhibition.description[language]}
            </p>
          </div>
        </div>
      </section>

      {/* Installation Views Gallery */}
      {exhibition.images && exhibition.images.length > 0 && (
        <section className="px-6 py-12 bg-gray-50">
          <div className="max-w-[1440px] mx-auto">
            {/* Section Title */}
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-gray-300 flex-1" />
              <h2 className="text-lg font-medium tracking-wide text-gray-800">
                {labels.installationViews[language]}
              </h2>
              <div className="h-px bg-gray-300 flex-1" />
            </div>

            {/* Image Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exhibition.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] bg-gray-200 overflow-hidden group"
                >
                  <Image
                    src={image}
                    alt={`${exhibition.title[language]} - ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact CTA */}
      <section className="py-16 px-6 bg-black text-white">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-2xl tracking-wider font-light mb-6">
            {language === 'ko' ? '전시 문의' : 'Exhibition Inquiry'}
          </h2>
          <p className="mb-8 text-gray-300">
            {language === 'ko'
              ? '전시에 대해 더 자세히 알고 싶으시다면 문의해 주세요.'
              : 'Contact us for more information about this exhibition.'}
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-3 border-2 border-white hover:bg-white hover:text-black transition-all tracking-wider"
          >
            CONTACT US
          </Link>
        </div>
      </section>
    </div>
  )
}
