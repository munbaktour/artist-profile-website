'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { mockExhibitions } from '@/data/exhibitions'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { TRANSLATIONS } from '@/lib/constants'
import type { ExhibitionStatus } from '@/types'

export default function ExhibitionPage() {
  const { language } = useLanguage()
  const t = TRANSLATIONS.exhibition
  const [activeTab, setActiveTab] = useState<ExhibitionStatus>('current')

  const currentExhibitions = mockExhibitions.filter(ex => ex.status === activeTab)
  const featuredExhibition = currentExhibitions[0] // 첫 번째를 Featured로 표시
  const regularExhibitions = currentExhibitions.slice(1)

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

      {/* Featured Exhibition */}
      {featuredExhibition && (
        <section className="py-16 px-6">
          <div className="max-w-[1440px] mx-auto">
            <Link href={`/exhibition/${featuredExhibition.id}`} className="block">
              <div className="relative group cursor-pointer overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={featuredExhibition.posterImage}
                    alt={featuredExhibition.title.ko}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
                  <div className="p-8 md:p-12 text-white">
                    <p className="text-xs tracking-widest mb-2 text-gray-300">
                      {t.featured[language]}
                    </p>
                    <h2 className="text-4xl md:text-5xl mb-2 text-white tracking-wider font-light">
                      {featuredExhibition.title[language]}
                    </h2>
                    <p className="mb-2 text-lg">
                      {featuredExhibition.title[language === 'ko' ? 'en' : 'ko']}
                    </p>
                    <p className="text-sm mb-1">
                      {new Date(featuredExhibition.startDate).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} - {new Date(featuredExhibition.endDate).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    {featuredExhibition.location && (
                      <p className="text-sm text-gray-300">{featuredExhibition.location[language]}</p>
                    )}
                    <button className="mt-6 px-8 py-3 bg-white text-black text-xs tracking-widest hover:bg-gray-200 transition-all">
                      {t.viewDetails[language]}
                    </button>
                  </div>
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
                  href={`/exhibition/${exhibition.id}`}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                    <Image
                      src={exhibition.posterImage}
                      alt={exhibition.title.ko}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm tracking-widest">
                        {t.viewDetails[language]}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl tracking-wider font-medium">
                      {exhibition.title[language]}
                    </h3>
                    <p className="text-gray-600">
                      {exhibition.title[language === 'ko' ? 'en' : 'ko']}
                    </p>
                    <p className="text-sm text-gray-500">
                      {new Date(exhibition.startDate).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} - {new Date(exhibition.endDate).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    {exhibition.location && (
                      <p className="text-sm tracking-wide">{exhibition.location[language]}</p>
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
    </div>
  )
}
