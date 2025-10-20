import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { mockArtists } from '@/data/artists'

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  return mockArtists.map((artist) => ({
    id: artist.id,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params
  const artist = mockArtists.find((a) => a.id === id)

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
  const artist = mockArtists.find((a) => a.id === id)

  if (!artist) {
    notFound()
  }

  // Mock exhibition data - 나중에 실제 데이터로 교체
  const artistExhibitions = [
    {
      id: '1',
      title: '개인전 예시',
      year: '2024',
      location: 'KWANHOONARTE',
      type: '개인전'
    },
    {
      id: '2',
      title: '그룹전 예시',
      year: '2023',
      location: '서울시립미술관',
      type: '그룹전'
    },
  ]

  // Mock artworks - 나중에 실제 데이터로 교체
  const artworks = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80',
      title: '작품 제목 1',
      year: 2024,
      medium: 'Canvas on oil',
      dimensions: '100 x 100 cm'
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1578926375605-eaf7559b40d4?w=800&q=80',
      title: '작품 제목 2',
      year: 2024,
      medium: 'Mixed media',
      dimensions: '120 x 80 cm'
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80',
      title: '작품 제목 3',
      year: 2023,
      medium: 'Acrylic on canvas',
      dimensions: '150 x 150 cm'
    },
  ]

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
            <div className="relative aspect-square overflow-hidden">
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
                <p className="text-gray-700 leading-relaxed">
                  {artist.bio.ko}
                </p>
              </div>

              {artist.education && artist.education.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-medium mb-4 tracking-wide">학력</h2>
                  <ul className="space-y-2 text-gray-700">
                    {artist.education.map((edu, index) => (
                      <li key={index}>{edu}</li>
                    ))}
                  </ul>
                </div>
              )}

              {artistExhibitions.length > 0 && (
                <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-lg font-medium mb-4 tracking-wide">주요 전시</h2>
                  <ul className="space-y-3 text-gray-700">
                    {artistExhibitions.map((exhibition) => (
                      <li key={exhibition.id} className="flex gap-3">
                        <span className="text-gray-500 min-w-[60px]">{exhibition.year}</span>
                        <div>
                          <p className="font-medium">{exhibition.title}</p>
                          <p className="text-sm text-gray-600">{exhibition.location} · {exhibition.type}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Artworks */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-3xl tracking-wider font-light mb-12 text-center">주요 작품</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
              <div key={artwork.id} className="group">
                <div className="relative aspect-square overflow-hidden mb-4">
                  <Image
                    src={artwork.image}
                    alt={artwork.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-medium tracking-wide">{artwork.title}</h3>
                  <p className="text-sm text-gray-600">{artwork.year}</p>
                  <p className="text-sm text-gray-500">{artwork.medium}</p>
                  <p className="text-sm text-gray-500">{artwork.dimensions}</p>
                </div>
              </div>
            ))}
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
