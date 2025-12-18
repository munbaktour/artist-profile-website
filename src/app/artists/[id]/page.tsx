'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { use } from 'react'
import { artistsData } from '@/data/artists'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { ArtistSubNav, ArtistBiography, ArtistWorks } from '@/components/features/artists'

interface PageProps {
  params: Promise<{ id: string }>
}

export default function ArtistDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const { language } = useLanguage()
  const artist = artistsData.find((a) => a.id === id)

  if (!artist) {
    notFound()
  }

  // Determine which sections are visible based on data availability
  const navItems = [
    {
      id: 'biography',
      label: { ko: 'Biography', en: 'Biography' },
      visible: true, // Always show biography
      type: 'scroll' as const
    },
    {
      id: 'works',
      label: { ko: 'Works', en: 'Works' },
      visible: (artist.works && artist.works.length > 0) || false,
      type: 'scroll' as const
    },
    {
      id: 'cv',
      label: { ko: "Artist's CV", en: "Artist's CV" },
      visible: !!artist.cv,
      type: 'link' as const,
      href: `/artists/${id}/cv`
    }
  ]

  const labels = {
    inquiryTitle: { ko: '작품 문의', en: 'Artwork Inquiry' },
    inquiryDesc: {
      ko: `${artist.name[language]} 작가의 작품에 대해 더 자세히 알고 싶으시다면 문의해 주세요.`,
      en: `Contact us for more information about ${artist.name[language]}'s artworks.`
    },
    contactUs: { ko: 'CONTACT US', en: 'CONTACT US' }
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header: Artist Name + Sub Navigation */}
      <header className="px-6 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          {/* Artist Name */}
          <div className="pt-12 pb-4">
            <h1 className="text-4xl md:text-5xl tracking-wider font-light">
              {artist.name[language]}
            </h1>
            <p className="text-lg text-gray-500 mt-2">
              {artist.name[language === 'ko' ? 'en' : 'ko']}
            </p>
          </div>

          {/* Sub Navigation */}
          <ArtistSubNav items={navItems} />
        </div>
      </header>

      {/* Biography Section */}
      <ArtistBiography artist={artist} />

      {/* Works Section */}
      <ArtistWorks artist={artist} />

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
