'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { TRANSLATIONS } from '@/lib/constants'

export default function AboutPage() {
  const { language } = useLanguage()
  const t = TRANSLATIONS.about

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1760622728897-a416b28c9c2f?w=1920&q=80"
          alt="Gallery Space"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center px-4">
          <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-widest font-light text-center">
            {t.hero.title[language]}
          </h1>
        </div>
      </section>

      {/* Gallery Introduction */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl mb-8 tracking-wider font-light">
            {t.introduction.title[language]}
          </h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            {t.introduction.paragraphs[language].map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy & Vision */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl mb-6 tracking-wider font-light">
                {t.philosophy.title[language]}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t.philosophy.content[language]}
              </p>
            </div>
            <div>
              <h3 className="text-2xl mb-6 tracking-wider font-light">
                {t.vision.title[language]}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {t.vision.content[language]}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Spaces - Option C: 좌우 분할 레이아웃 */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-[1200px] mx-auto">

          {/* 상단: 대형 이미지 + 텍스트 좌우 분할 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* 좌측: 대형 이미지 */}
            <div className="group">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={t.spaces.images.main}
                  alt="갤러리 전경"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-center tracking-wide text-sm mt-4">갤러리 전경</p>
            </div>

            {/* 우측: 로고 + 제목 + 텍스트 */}
            <div className="flex flex-col justify-center">
              {/* 로고 + 제목 수평 정렬 */}
              <div className="flex items-center gap-6 mb-8">
                <Image
                  src="/images/logo/logo.png"
                  alt="KWANHOON ARTE"
                  width={80}
                  height={80}
                  className="object-contain"
                />
                <h2 className="text-2xl md:text-3xl tracking-widest font-light">
                  {t.spaces.title[language]}
                </h2>
              </div>
              <div className="space-y-2 text-gray-700 leading-normal">
                {t.spaces.description[language].split('\n').map((line: string, i: number) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          </div>

          {/* 하단: 서브 이미지 2개 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="group">
              <div className="relative aspect-[3/2] overflow-hidden mb-4">
                <Image
                  src={t.spaces.images.projectRoom}
                  alt={t.spaces.captions.projectSpace[language]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-center tracking-wide text-sm">Project Space</p>
            </div>
            <div className="group">
              <div className="relative aspect-[3/2] overflow-hidden mb-4">
                <Image
                  src={t.spaces.images.viewingRoom}
                  alt={t.spaces.captions.viewingRoom[language]}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <p className="text-center tracking-wide text-sm">Viewing Room</p>
            </div>
          </div>

        </div>
      </section>

    </div>
  )
}
