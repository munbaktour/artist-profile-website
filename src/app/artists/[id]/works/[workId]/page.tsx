'use client'

import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'
import { X, ChevronRight, ChevronLeft } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { artistsData } from '@/data/artists'

export default function ArtworkDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { language } = useLanguage()
  const imageRef = useRef<HTMLDivElement>(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 })

  const artistId = params.id as string
  const workId = params.workId as string

  const artist = artistsData.find(a => a.id === artistId)

  if (!artist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          {language === 'ko' ? '작가를 찾을 수 없습니다.' : 'Artist not found.'}
        </p>
      </div>
    )
  }

  const works = artist.works || []
  const currentIndex = works.findIndex(w => w.id === workId)
  const artwork = works[currentIndex]

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">
          {language === 'ko' ? '작품을 찾을 수 없습니다.' : 'Artwork not found.'}
        </p>
      </div>
    )
  }

  const prevWork = currentIndex > 0 ? works[currentIndex - 1] : null
  const nextWork = currentIndex < works.length - 1 ? works[currentIndex + 1] : null

  // 마우스 호버 시 확대 위치 계산
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return
    const rect = imageRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    setZoomPosition({ x, y })
  }

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-hidden">
      {/* 닫기 버튼 */}
      <button
        onClick={() => router.back()}
        className="absolute top-6 right-6 z-50 p-2 text-gray-400 hover:text-black transition-colors"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      {/* 메인 콘텐츠 - 아라리오 스타일 */}
      <div className="h-full flex">
        {/* 왼쪽 정보 패널 */}
        <div className="w-[380px] flex-shrink-0 p-12 flex flex-col justify-center">
          {/* 작가명 - 대문자, 굵게 */}
          <Link
            href={`/artists/${artistId}`}
            className="text-xl font-bold tracking-[0.2em] uppercase text-black hover:text-gray-600 transition-colors mb-8"
          >
            {artist.name[language]}
          </Link>

          {/* 작품 제목 */}
          <h1 className="text-sm font-medium tracking-[0.1em] uppercase text-gray-900 mb-1">
            {artwork.title[language]}{artwork.year ? `, ${artwork.year}` : ''}
          </h1>

          {/* 기법, 크기 */}
          <div className="mt-4 space-y-1 text-sm text-gray-600">
            <p>{artwork.medium}</p>
            {artwork.dimensions && <p>{artwork.dimensions}</p>}
          </div>

          {/* 부제 */}
          {artwork.subtitle && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 italic">
                {artwork.subtitle[language]}
              </p>
            </div>
          )}

          {/* 작품 설명 */}
          {artwork.description && (
            <div className="mt-6">
              <p className="text-sm text-gray-600 leading-relaxed">
                {artwork.description[language]}
              </p>
            </div>
          )}

          {/* 漢詩 (한시) */}
          {artwork.chinesePoetry && (
            <div className="mt-8 pt-6 border-t border-gray-100">
              <p className="text-xs text-gray-400 tracking-widest mb-4 font-light">漢詩</p>
              <div className="space-y-2">
                {artwork.chinesePoetry.lines.map((line, idx) => (
                  <div key={idx} className="flex items-baseline gap-3">
                    <span className="text-sm font-serif text-gray-800 tracking-wider">
                      {line.chinese}
                    </span>
                    <span className="text-xs text-gray-500">
                      {line.korean}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 詩 (한글시) */}
          {artwork.koreanPoetry && (
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-xs text-gray-400 tracking-widest mb-3 font-light">詩</p>
              <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line italic">
                {artwork.koreanPoetry[language]}
              </p>
            </div>
          )}

          {/* 하단 정보 */}
          <div className="mt-auto pt-8">
            <p className="text-xs text-gray-400 tracking-wider">
              {String(currentIndex + 1).padStart(2, '0')} / {String(works.length).padStart(2, '0')}
            </p>
          </div>
        </div>

        {/* 오른쪽 이미지 영역 - 호버 시 확대 */}
        <div className="flex-1 relative flex items-center justify-center bg-gray-50 p-8">
          {/* 이전/다음 네비게이션 - 이미지 컨테이너 내부 */}
          {prevWork && (
            <Link
              href={`/artists/${artistId}/works/${prevWork.id}`}
              className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/20 hover:bg-black/40 rounded-full text-white/70 hover:text-white transition-all"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </Link>
          )}
          {nextWork && (
            <Link
              href={`/artists/${artistId}/works/${nextWork.id}`}
              className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-3 bg-black/20 hover:bg-black/40 rounded-full text-white/70 hover:text-white transition-all"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </Link>
          )}

          <div
            ref={imageRef}
            className="relative max-w-full max-h-full cursor-zoom-in overflow-hidden"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <div
              className="transition-transform duration-200 ease-out"
              style={{
                transform: isZoomed ? 'scale(2)' : 'scale(1)',
                transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
              }}
            >
              <Image
                src={artwork.image}
                alt={artwork.title[language]}
                width={1200}
                height={1200}
                className="max-h-[80vh] w-auto h-auto object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
