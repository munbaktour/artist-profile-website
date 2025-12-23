'use client'

import { useMemo } from 'react'
import { CollageCard } from './CollageCard'
import { useLanguage } from '@/lib/i18n/LanguageProvider'
import { cn } from '@/lib/utils'
import type { Artist, CollageTileConfig } from '@/types'

/**
 * 6명 작가를 위한 콜라주 레이아웃 설정
 * 가고시안 스타일의 불규칙한 타일 배치
 */
const COLLAGE_LAYOUT: CollageTileConfig[] = [
  { artistId: 'jung-sun-young', size: 'featured' },  // 2x2 - 좌상단
  { artistId: 'byun-geon-ho', size: 'medium' },      // 1x1 - 중앙 상단
  { artistId: 'yoon-miran', size: 'tall' },          // 1x2 - 우측 (세로)
  { artistId: 'yoo-geun-young', size: 'medium' },    // 1x1 - 중앙 하단
  { artistId: 'kim-hyung-dae', size: 'wide' },       // 2x1 - 좌하단
  { artistId: 'son-moon-il', size: 'wide' },         // 2x1 - 우하단
]

interface ArtistsCollageGridProps {
  artists: Artist[]
  className?: string
}

export function ArtistsCollageGrid({ artists, className }: ArtistsCollageGridProps) {
  const { language } = useLanguage()

  // 레이아웃 설정과 작가 데이터 매칭
  const layoutArtists = useMemo(() => {
    return COLLAGE_LAYOUT.map(config => ({
      ...config,
      artist: artists.find(a => a.id === config.artistId)
    })).filter(item => item.artist)
  }, [artists])

  return (
    <section className={cn("px-4 md:px-6 pb-4", className)}>
      <div className="max-w-[1440px] mx-auto">
        {/*
          CSS Grid 레이아웃
          - 모바일: 2열
          - 태블릿: 4열
          - 데스크톱: 6열
          auto-rows로 행 높이 고정
        */}
        <div className={cn(
          "grid gap-1 md:gap-2",
          "grid-cols-2 md:grid-cols-4 lg:grid-cols-4",
          "auto-rows-[180px] sm:auto-rows-[200px] md:auto-rows-[280px] lg:auto-rows-[320px]",
          "[grid-auto-flow:dense]"
        )}>
          {layoutArtists.map(({ artist, size }) => (
            <CollageCard
              key={artist!.id}
              artist={artist!}
              size={size}
              locale={language}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
