import { artistsData } from '@/data/artists'
import { ArtistsCollageGrid } from '@/components/features/artists-beta/ArtistsCollageGrid'

export const metadata = {
  title: 'Artists (Beta) | KWANHOON ARTE',
  description: '관훈아르떼 소속 작가들을 새로운 콜라주 레이아웃으로 만나보세요.',
}

/**
 * Artists 페이지 베타 버전
 * 가고시안 갤러리 스타일의 콜라주/모자이크 레이아웃
 */
export default function ArtistsBetaPage() {
  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* 헤더 섹션 */}
      <section className="py-8 md:py-12 px-6">
        <div className="max-w-[1440px] mx-auto text-center">
          <h1 className="text-3xl md:text-4xl tracking-widest font-light text-gray-900">
            ARTISTS
          </h1>
          <p className="text-xs md:text-sm text-gray-400 mt-2 tracking-wide">
            BETA LAYOUT
          </p>
        </div>
      </section>

      {/* 콜라주 그리드 */}
      <ArtistsCollageGrid artists={artistsData} />
    </div>
  )
}
