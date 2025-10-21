'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Artist, Language } from '@/types'

interface ArtistCardProps {
  artist: Artist
  locale?: Language
  viewType?: 'grid' | 'list'
}

export function ArtistCard({ artist, locale = 'ko', viewType = 'grid' }: ArtistCardProps) {
  const artistName = artist.name[locale]
  const artistBio = artist.bio[locale]
  const imageUrl = artist.image || '/images/placeholder-artist.jpg'

  if (viewType === 'list') {
    return (
      <Link
        href={`/artists/${artist.id}`}
        className="flex items-center gap-6 p-4 border border-gray-200 hover:bg-gray-50 transition-colors group"
      >
        <div className="relative w-24 h-24 overflow-hidden flex-shrink-0">
          <Image
            src={imageUrl}
            alt={artistName}
            fill
            className="object-cover"
            sizes="96px"
          />
        </div>
        <div className="flex-1">
          <h3 className="tracking-wide mb-1 font-medium text-lg">{artistName}</h3>
          <p className="text-sm text-gray-600 mb-1">
            {artist.birthYear && `b. ${artist.birthYear}`} {artist.nationality}
          </p>
          <p className="text-sm text-gray-500 line-clamp-2">{artistBio}</p>
        </div>
        <button className="px-6 py-2 border border-black text-xs tracking-widest hover:bg-black hover:text-white transition-all opacity-0 group-hover:opacity-100">
          VIEW
        </button>
      </Link>
    )
  }

  return (
    <Link
      href={`/artists/${artist.id}`}
      className="group cursor-pointer block"
    >
      <div className="relative overflow-hidden mb-4 aspect-square bg-gray-100">
        <Image
          src={imageUrl}
          alt={artistName}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white text-sm tracking-widest">VIEW ARTIST</span>
        </div>
      </div>
      <h3 className="tracking-wide mb-1 font-medium">{artistName}</h3>
      <p className="text-sm text-gray-600">
        {artist.birthYear && `b. ${artist.birthYear}`}
      </p>
      <p className="text-sm text-gray-500 mt-1">{artist.nationality}</p>
    </Link>
  )
}
