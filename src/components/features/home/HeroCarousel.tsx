/**
 * HeroCarousel Component
 * Swiper 기반 풀스크린 이미지 캐러셀
 * - Desktop: 3개 미리보기
 * - Mobile: 단일 이미지, 세로 스크롤
 * - 자동 재생: 6초
 */

'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ChevronDown } from 'lucide-react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules'

// Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'

import { cn } from '@/lib/utils'
import { CAROUSEL_SETTINGS } from '@/lib/constants'

import type { CarouselProps } from '@/types/components'

export function HeroCarousel({ images, className }: CarouselProps) {
  const [isMobile, setIsMobile] = useState(false)

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024) // lg breakpoint
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // 스크롤 핸들러
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    })
  }

  return (
    <section
      className={cn('relative h-screen w-full overflow-hidden', className)}
    >
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={isMobile ? 0 : 30}
        slidesPerView={isMobile ? 1 : 'auto'}
        centeredSlides={!isMobile}
        loop={true}
        autoplay={{
          delay: CAROUSEL_SETTINGS.AUTO_PLAY_INTERVAL,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.hero-pagination',
        }}
        navigation={!isMobile}
        effect={isMobile ? 'fade' : undefined}
        fadeEffect={
          isMobile
            ? {
                crossFade: true,
              }
            : undefined
        }
        speed={CAROUSEL_SETTINGS.TRANSITION_DURATION}
        className="h-full w-full"
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={image.id}
            className={cn(
              'relative',
              !isMobile && 'lg:w-[70vw] lg:max-w-[1200px]'
            )}
          >
            {/* Image Container */}
            <div className="relative h-full w-full">
              <Image
                src={image.src}
                alt={image.alt.ko}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />

              {/* Subtle overlay */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Image Title (Optional) */}
              {image.title && (
                <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-10 text-center">
                  <h2 className="text-white text-2xl md:text-4xl font-light tracking-wider">
                    {image.title.ko}
                  </h2>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination */}
      <div className="hero-pagination absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {/* Swiper가 자동으로 버튼 생성 */}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <button
          onClick={handleScrollDown}
          className="flex flex-col items-center text-white hover:text-gray-300 transition-colors group"
          aria-label="아래로 스크롤"
        >
          <span className="text-xs tracking-widest mb-2">SCROLL</span>
          <ChevronDown className="w-6 h-6 animate-bounce" />
        </button>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        /* Pagination Bullets */
        .hero-pagination .swiper-pagination-bullet {
          width: 48px;
          height: 2px;
          border-radius: 0;
          background: rgba(255, 255, 255, 0.4);
          opacity: 1;
          transition: all 0.3s;
        }

        .hero-pagination .swiper-pagination-bullet-active {
          background: rgba(255, 255, 255, 1);
          width: 64px;
        }

        /* Navigation Arrows (Desktop only) */
        .swiper-button-prev,
        .swiper-button-next {
          color: white;
          background: rgba(0, 0, 0, 0.3);
          width: 50px;
          height: 50px;
          border-radius: 50%;
          transition: all 0.3s;
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background: rgba(0, 0, 0, 0.5);
        }

        .swiper-button-prev::after,
        .swiper-button-next::after {
          font-size: 20px;
        }

        /* Desktop: Side slides preview */
        @media (min-width: 1024px) {
          .swiper-slide {
            opacity: 0.6;
            transition: opacity 0.3s;
          }

          .swiper-slide-active {
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
