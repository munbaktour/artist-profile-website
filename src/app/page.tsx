/**
 * Home Page
 * KWANHOONARTE 갤러리 홈페이지
 */

import { HeroCarousel } from '@/components/features/home/HeroCarousel'
import { HERO_IMAGES } from '@/data/heroImages'
import ExhibitionPopup from '@/components/organisms/ExhibitionPopup'

export default function Home() {
  return (
    <div>
      {/* 전시 팝업 */}
      <ExhibitionPopup />
      {/* Hero Section - Full Screen Carousel */}
      <HeroCarousel images={HERO_IMAGES} />

      {/* Content Section */}
      <section id="content" className="py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="text-center space-y-8">
            <h1 className="text-4xl md:text-6xl font-light tracking-wider">
              KWANHOON ARTE
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Contemporary Art Gallery
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
