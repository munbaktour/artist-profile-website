'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { TRANSLATIONS } from '@/lib/constants'

type ExhibitionStatus = 'current' | 'upcoming' | 'past'

interface ExhibitionData {
  id: string
  slug: string
  title_ko: string
  title_en: string | null
  artist_name_ko: string | null
  status: string
  start_date: string
  end_date: string
  location_ko: string | null
  location_en: string | null
  poster_image: string | null
}

export default function ExhibitionPage() {
  const { language } = useLanguage()
  const t = TRANSLATIONS.exhibition
  const [activeTab, setActiveTab] = useState<ExhibitionStatus>('current')
  const [exhibitions, setExhibitions] = useState<ExhibitionData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

    fetch('/api/admin/exhibitions', { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (data.data) setExhibitions(data.data)
      })
      .catch(err => {
        if (err.name !== 'AbortError') console.error('Failed to fetch exhibitions:', err)
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [])

  const currentExhibitions = exhibitions.filter(ex => ex.status === activeTab)
  const featuredExhibition = currentExhibitions[0]
  const regularExhibitions = currentExhibitions.slice(1)

  const getTitle = (ex: ExhibitionData) =>
    language === 'ko' ? ex.title_ko : (ex.title_en || ex.title_ko)

  const getLocation = (ex: ExhibitionData) =>
    language === 'ko' ? (ex.location_ko || '') : (ex.location_en || ex.location_ko || '')

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Tab Navigation */}
      <section className="py-12 px-6 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-4xl text-center mb-8 tracking-widest font-light">
            {t.header.title[language]}
          </h1>
          <div className="flex justify-center gap-8">
            {(['current', 'upcoming', 'past'] as ExhibitionStatus[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm tracking-widest uppercase transition-all ${
                  activeTab === tab
                    ? 'border-b-2 border-black text-black font-medium'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {t.tabs[tab][language]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <section className="py-16 px-6">
          <div className="max-w-[800px] mx-auto text-center">
            <p className="text-gray-400">...</p>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Exhibition */}
          {featuredExhibition && featuredExhibition.poster_image && (
            <section className="py-16 px-6">
              <div className="max-w-[1440px] mx-auto">
                <Link href={`/exhibition/${featuredExhibition.slug}`} className="block">
                  <div className="relative group cursor-pointer overflow-hidden">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <Image
                        src={featuredExhibition.poster_image}
                        alt={getTitle(featuredExhibition)}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                      />
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          )}

          {/* Exhibition Grid */}
          {regularExhibitions.length > 0 && (
            <section className="py-16 px-6">
              <div className="max-w-[1440px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularExhibitions.map((exhibition) => (
                    <Link
                      key={exhibition.id}
                      href={`/exhibition/${exhibition.slug}`}
                      className="group cursor-pointer"
                    >
                      {exhibition.poster_image && (
                        <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                          <Image
                            src={exhibition.poster_image}
                            alt={getTitle(exhibition)}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <span className="text-white text-sm tracking-widest">
                              {t.viewDetails[language]}
                            </span>
                          </div>
                        </div>
                      )}
                      <div className="space-y-2">
                        <h3 className="text-xl tracking-wider font-medium">
                          {getTitle(exhibition)}
                        </h3>
                        {exhibition.title_en && language === 'ko' && (
                          <p className="text-gray-600">{exhibition.title_en}</p>
                        )}
                        <p className="text-sm text-gray-500">
                          {new Date(exhibition.start_date).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })} - {new Date(exhibition.end_date).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        {getLocation(exhibition) && (
                          <p className="text-sm tracking-wide">{getLocation(exhibition)}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Archive Message for Past Exhibitions */}
          {activeTab === 'past' && (
            <section className="py-12 px-6 bg-gray-50">
              <div className="max-w-[800px] mx-auto text-center">
                <h3 className="text-2xl mb-4 tracking-wider font-light">
                  {t.archive.title[language]}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {t.archive.description[language]}
                </p>
                <button className="px-8 py-3 border border-black text-xs tracking-widest hover:bg-black hover:text-white transition-all">
                  {t.archive.viewAll[language]}
                </button>
              </div>
            </section>
          )}

          {/* Empty State */}
          {currentExhibitions.length === 0 && (
            <section className="py-16 px-6">
              <div className="max-w-[800px] mx-auto text-center">
                <p className="text-gray-500 text-lg">
                  {t.empty[language].replace('{tab}', t.tabs[activeTab][language])}
                </p>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  )
}
