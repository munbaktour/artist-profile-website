'use client'

import { useState } from 'react'
import { Grid, List } from 'lucide-react'
import { artistsData } from '@/data/artists'
import { ArtistCard } from '@/components/molecules/ArtistCard'
import type { ArtistFilter, Language } from '@/types'

type ViewType = 'grid' | 'list'

export default function ArtistsPage() {
  const [filter, setFilter] = useState<ArtistFilter>('all')
  const [viewType, setViewType] = useState<ViewType>('grid')
  const [visibleCount, setVisibleCount] = useState(12)
  const locale: Language = 'ko' // TODO: 다국어 컨텍스트에서 가져오기

  const filteredArtists = artistsData.filter((artist) => {
    if (filter === 'all') return true
    return artist.category === filter
  })

  const visibleArtists = filteredArtists.slice(0, visibleCount)

  const filterLabels: Record<ArtistFilter, string> = {
    all: '전체',
    featured: '대표 작가',
    emerging: '신진 작가',
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header Section */}
      <section className="py-12 px-6 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-4xl text-center mb-8 tracking-widest font-light">
            ARTISTS
          </h1>

          {/* Filter Options */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex gap-4 flex-wrap justify-center">
              {(['all', 'featured', 'emerging'] as ArtistFilter[]).map((f) => (
                <button
                  key={f}
                  onClick={() => {
                    setFilter(f)
                    setVisibleCount(12) // Reset visible count when filtering
                  }}
                  className={`px-6 py-2 text-xs tracking-widest uppercase transition-all ${
                    filter === f
                      ? 'bg-black text-white'
                      : 'bg-white text-black border border-black hover:bg-gray-100'
                  }`}
                >
                  {filterLabels[f]}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 border border-gray-300">
              <button
                onClick={() => setViewType('grid')}
                className={`p-2 ${viewType === 'grid' ? 'bg-black text-white' : 'bg-white text-black'}`}
                aria-label="Grid view"
              >
                <Grid size={20} />
              </button>
              <button
                onClick={() => setViewType('list')}
                className={`p-2 ${viewType === 'list' ? 'bg-black text-white' : 'bg-white text-black'}`}
                aria-label="List view"
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Artists Grid/List */}
      <section className="py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          {viewType === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {visibleArtists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  locale={locale}
                  viewType="grid"
                />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {visibleArtists.map((artist) => (
                <ArtistCard
                  key={artist.id}
                  artist={artist}
                  locale={locale}
                  viewType="list"
                />
              ))}
            </div>
          )}

          {/* Load More Button */}
          {visibleCount < filteredArtists.length && (
            <div className="mt-16 text-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 8)}
                className="px-12 py-3 border border-black text-sm tracking-widest uppercase hover:bg-black hover:text-white transition-all duration-300"
              >
                더 보기
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
