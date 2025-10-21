import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { artistsData } from '@/data/artists'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return artistsData.map((artist) => ({
    id: artist.id,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const artist = artistsData.find((a) => a.id === id)

  if (!artist) {
    return {
      title: 'Artist Not Found | KWANHOONARTE',
    }
  }

  return {
    title: `${artist.name.ko} | KWANHOONARTE`,
    description: artist.bio.ko,
  }
}

export default async function ArtistDetailPage({ params }: PageProps) {
  const { id } = await params
  const artist = artistsData.find((a) => a.id === id)

  if (!artist) {
    notFound()
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="py-6 px-6 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-black">Home</Link>
            <span>/</span>
            <Link href="/artists" className="hover:text-black">Artists</Link>
            <span>/</span>
            <span className="text-black">{artist.name.ko}</span>
          </div>
        </div>
      </div>

      {/* Artist Profile */}
      <section className="py-16 px-6">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Artist Image */}
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <Image
                src={artist.image}
                alt={artist.name.ko}
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Artist Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl tracking-wider font-light mb-4">
                  {artist.name.ko}
                </h1>
                <p className="text-xl text-gray-600 mb-2">{artist.name.en}</p>
                {artist.birthYear && (
                  <p className="text-gray-600">
                    {artist.birthYear}년생 · {artist.nationality}
                  </p>
                )}
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-lg font-medium mb-4 tracking-wide">작가 소개</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {artist.bio.ko}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 px-6 bg-black text-white">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-2xl tracking-wider font-light mb-6">작품 문의</h2>
          <p className="mb-8 text-gray-300">
            {artist.name.ko} 작가의 작품에 대해 더 자세히 알고 싶으시다면 문의해 주세요.
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-3 border-2 border-white hover:bg-white hover:text-black transition-all tracking-wider"
          >
            CONTACT US
          </Link>
        </div>
      </section>
    </div>
  )
}
