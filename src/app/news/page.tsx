'use client'

import Image from 'next/image'
import Link from 'next/link'
import { mockNews } from '@/data/news'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { TRANSLATIONS } from '@/lib/constants'

export default function NewsPage() {
  const { language } = useLanguage()
  const t = TRANSLATIONS.news
  const featuredNews = mockNews[0]
  const regularNews = mockNews.slice(1)

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 px-6 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-4xl text-center tracking-widest font-light">
            {t.header.title[language]}
          </h1>
        </div>
      </section>

      {/* Featured News */}
      {featuredNews && (
        <section className="py-16 px-6">
          <div className="max-w-[1440px] mx-auto">
            <Link href={`/news/${featuredNews.id}`} className="block group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={featuredNews.thumbnailImage || ''}
                    alt={featuredNews.title.ko}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="text-xs tracking-widest text-gray-500 mb-2">
                    {t.categories[featuredNews.category][language]}
                  </p>
                  <h2 className="text-3xl md:text-4xl mb-4 tracking-wider font-light">
                    {featuredNews.title[language]}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {new Date(featuredNews.date).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {featuredNews.content[language]}
                  </p>
                  <div className="inline-block px-8 py-3 border border-black text-xs tracking-widest hover:bg-black hover:text-white transition-all w-fit">
                    {t.readMore[language]}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* News Grid */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {regularNews.map((news) => (
              <Link
                key={news.id}
                href={`/news/${news.id}`}
                className="group bg-white overflow-hidden hover:shadow-lg transition-shadow"
              >
                {news.thumbnailImage && (
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={news.thumbnailImage}
                      alt={news.title.ko}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6">
                  <p className="text-xs tracking-widest text-gray-500 mb-2">
                    {t.categories[news.category][language]}
                  </p>
                  <h3 className="text-xl mb-3 tracking-wide font-medium group-hover:text-gray-600 transition-colors">
                    {news.title[language]}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {new Date(news.date).toLocaleDateString(language === 'ko' ? 'ko-KR' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-gray-700 line-clamp-3 leading-relaxed text-sm">
                    {news.content[language]}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
