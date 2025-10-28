'use client'

import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { TRANSLATIONS } from '@/lib/constants'

export default function AboutPage() {
  const { language } = useLanguage()
  const t = TRANSLATIONS.about

  // Gallery spaces data
  const gallerySpaces = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1663736244030-1e3fdc47c84c?w=1080&q=80',
      caption: t.spaces.captions.mainHall[language],
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1535056889777-5821f7c5b4ff?w=1080&q=80',
      caption: t.spaces.captions.projectSpace[language],
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1743119638006-a01d4625745d?w=1080&q=80',
      caption: t.spaces.captions.viewingRoom[language],
    },
  ]

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

      {/* Gallery Spaces */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-3xl mb-12 text-center tracking-wider font-light">
            {t.spaces.title[language]}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gallerySpaces.map((space) => (
              <div key={space.id} className="group">
                <div className="relative overflow-hidden mb-4 h-[300px]">
                  <Image
                    src={space.image}
                    alt={space.caption}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-center tracking-wide text-sm">{space.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
