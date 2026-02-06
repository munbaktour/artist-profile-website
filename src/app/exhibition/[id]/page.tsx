'use client'

import { useParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageProvider'

interface ExhibitionDetail {
  id: string
  slug: string
  title_ko: string
  title_en: string | null
  artist_name_ko: string | null
  artist_name_en: string | null
  status: string
  start_date: string
  end_date: string
  location_ko: string | null
  location_en: string | null
  description_ko: string | null
  description_en: string | null
  poster_image: string | null
  images: string[] | null
}

export default function ExhibitionDetailPage() {
  const params = useParams()
  const { language } = useLanguage()
  const exhibitionId = params.id as string

  const [exhibition, setExhibition] = useState<ExhibitionDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`/api/admin/exhibitions/${exhibitionId}`, { signal: controller.signal })
      .then(res => {
        if (res.status === 404) {
          setNotFound(true)
          return null
        }
        return res.json()
      })
      .then(data => {
        if (data?.data) setExhibition(data.data)
      })
      .catch(err => {
        if (err.name !== 'AbortError') setNotFound(true)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [exhibitionId])

  if (loading) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-400">...</p>
      </div>
    )
  }

  if (notFound || !exhibition) {
    return (
      <div className="pt-20 min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg mb-4">
            {language === 'ko' ? '전시를 찾을 수 없습니다.' : 'Exhibition not found.'}
          </p>
          <Link href="/exhibition" className="text-sm text-gray-400 hover:text-gray-600">
            {language === 'ko' ? '전시 목록으로' : 'Back to exhibitions'}
          </Link>
        </div>
      </div>
    )
  }

  const title = language === 'ko' ? exhibition.title_ko : (exhibition.title_en || exhibition.title_ko)
  const location = language === 'ko' ? (exhibition.location_ko || '') : (exhibition.location_en || exhibition.location_ko || '')
  const description = language === 'ko' ? (exhibition.description_ko || '') : (exhibition.description_en || exhibition.description_ko || '')
  const artistName = language === 'ko' ? (exhibition.artist_name_ko || '') : (exhibition.artist_name_en || exhibition.artist_name_ko || '')

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
      {exhibition.poster_image && (
        <section className="relative w-full aspect-[16/9] max-h-[70vh] bg-gray-100">
          <Image
            src={exhibition.poster_image}
            alt={title}
            fill
            className="object-contain"
            priority
          />
        </section>
      )}

      {/* Exhibition Info */}
      {(artistName || description || location) && (
        <section className="px-6 py-12">
          <div className="max-w-[800px] mx-auto space-y-6">
            <h1 className="text-3xl font-light tracking-wider">{title}</h1>
            {artistName && (
              <div>
                <p className="text-sm text-gray-500 mb-1">{labels.artist[language]}</p>
                <p className="text-lg">{artistName}</p>
              </div>
            )}
            <div>
              <p className="text-sm text-gray-500 mb-1">{labels.period[language]}</p>
              <p>{formatDate(exhibition.start_date)} - {formatDate(exhibition.end_date)}</p>
            </div>
            {location && (
              <div>
                <p className="text-sm text-gray-500 mb-1">{labels.location[language]}</p>
                <p>{location}</p>
              </div>
            )}
            {description && (
              <div>
                <p className="text-sm text-gray-500 mb-1">{labels.about[language]}</p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{description}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Installation Views Gallery */}
      {exhibition.images && exhibition.images.length > 0 && (
        <section className="px-6 py-12 bg-gray-50">
          <div className="max-w-[1440px] mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-px bg-gray-300 flex-1" />
              <h2 className="text-lg font-medium tracking-wide text-gray-800">
                {labels.installationViews[language]}
              </h2>
              <div className="h-px bg-gray-300 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exhibition.images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] bg-gray-200 overflow-hidden group"
                >
                  <Image
                    src={image}
                    alt={`${title} - ${index + 1}`}
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
