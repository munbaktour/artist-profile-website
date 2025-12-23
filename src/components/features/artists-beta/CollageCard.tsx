'use client'

import Image from 'next/image'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import type { Artist, Language, CollageTileSize } from '@/types'

// 타일 크기에 따른 CSS Grid 클래스
const SIZE_CLASSES: Record<CollageTileSize, string> = {
  small: 'col-span-1 row-span-1',
  medium: 'col-span-1 row-span-1',
  wide: 'col-span-2 row-span-1',
  tall: 'col-span-1 row-span-2',
  featured: 'col-span-2 row-span-2',
}

// 반응형 이미지 사이즈 설정
function getSizesForTile(size: CollageTileSize): string {
  switch (size) {
    case 'featured':
      return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
    case 'wide':
      return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
    case 'tall':
      return '(max-width: 768px) 50vw, 25vw'
    default:
      return '(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw'
  }
}

interface CollageCardProps {
  artist: Artist
  size: CollageTileSize
  locale: Language
  className?: string
}

export function CollageCard({ artist, size, locale, className }: CollageCardProps) {
  const artistName = artist.name[locale]
  // 이미지 우선순위: featuredImage > thumbnailImage > image
  const imageUrl = artist.featuredImage || artist.thumbnailImage || artist.image

  return (
    <Link
      href={`/artists/${artist.id}`}
      className={cn(
        'group relative overflow-hidden cursor-pointer',
        'transition-all duration-500',
        SIZE_CLASSES[size],
        className
      )}
    >
      {/* 이미지 */}
      <div className="absolute inset-0">
        <Image
          src={imageUrl}
          alt={artistName}
          fill
          className={cn(
            'object-cover',
            'transition-all duration-700 ease-out',
            'group-hover:scale-105',
            // 가고시안 스타일: 흑백 → 호버 시 컬러
            'grayscale group-hover:grayscale-0'
          )}
          sizes={getSizesForTile(size)}
          priority={size === 'featured'}
        />
      </div>

      {/* 호버 오버레이 + 작가명 */}
      <div className={cn(
        'absolute inset-0 flex items-end justify-start p-4 md:p-6',
        'bg-gradient-to-t from-black/70 via-black/20 to-transparent',
        'opacity-0 group-hover:opacity-100',
        'transition-opacity duration-300'
      )}>
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-white text-lg md:text-xl lg:text-2xl font-light tracking-wide">
            {artistName}
          </h3>
          {artist.birthYear && (
            <p className="text-white/70 text-sm mt-1">
              b. {artist.birthYear}
            </p>
          )}
        </div>
      </div>

      {/* 하단 인디케이터 라인 */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/0 group-hover:bg-white/80 transition-all duration-300" />
    </Link>
  )
}
