import Image from 'next/image'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About | KWANHOONARTE',
  description: 'Contemporary art gallery connecting Eastern and Western art since 1993',
}

export default function AboutPage() {
  // Mock data - 나중에 /data/about.ts로 이동
  const gallerySpaces = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1663736244030-1e3fdc47c84c?w=1080&q=80',
      caption: { ko: '메인 전시홀', en: 'Main Exhibition Hall' },
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1535056889777-5821f7c5b4ff?w=1080&q=80',
      caption: { ko: '프로젝트 공간', en: 'Project Space' },
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1743119638006-a01d4625745d?w=1080&q=80',
      caption: { ko: '뷰잉룸', en: 'Viewing Room' },
    },
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1760622728897-a416b28c9c2f?w=1920&q=80"
          alt="Gallery Space"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-6xl tracking-widest font-light">
            ABOUT KWANHOONARTE
          </h1>
        </div>
      </section>

      {/* Gallery Introduction */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="text-3xl mb-8 tracking-wider font-light">서울의 현대 미술 갤러리</h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>
              관훈아르테는 서울을 기반으로 한 현대 미술 갤러리로, 한국과 전 세계의 신진 및 기성 작가들의 혁신적인 작품을 선보이는 데 전념하고 있습니다. 설립 이래 우리는 동서양 예술 전통 간의 대화를 촉진하는 데 헌신해 왔습니다.
            </p>
            <p>
              우리 갤러리는 비평적 담론과 문화 교류를 위한 플랫폼 역할을 하며, 기존의 경계에 도전하고 현대 미술의 새로운 관점을 탐구하는 전시를 선보입니다. 우리는 예술의 변혁적 힘이 영감을 주고, 자극하며, 공동체를 연결한다고 믿습니다.
            </p>
            <p>
              신중하게 기획된 전시, 작가 협업, 공공 프로그램을 통해 우리는 현대 미술을 다양한 관객에게 접근 가능하게 만들고, 미래의 예술을 형성하는 비전있는 작가들의 경력을 지원하고자 합니다.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy & Vision */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl mb-6 tracking-wider font-light">우리의 철학</h3>
              <p className="text-gray-700 leading-relaxed">
                우리는 예술이 문화적, 지리적 경계를 초월하여 서로 다른 배경을 가진 사람들을 연결하는 보편적 언어 역할을 한다고 믿습니다. 우리의 접근 방식은 진정성, 혁신, 그리고 예술적 진실성에 대한 깊은 존중에 뿌리를 두고 있습니다. 우리는 뛰어난 장인 정신을 보여줄 뿐만 아니라 우리 시대의 긴급한 사회적, 문화적, 환경적 문제에 참여하는 작품을 선보이는 데 전념합니다.
              </p>
            </div>
            <div>
              <h3 className="text-2xl mb-6 tracking-wider font-light">우리의 비전</h3>
              <p className="text-gray-700 leading-relaxed">
                우리의 비전은 관훈아르테를 아시아 현대 미술계의 중요한 문화 허브로 확립하는 것입니다. 우리는 예술적 우수성에 대한 헌신과 획기적인 작가들의 경력을 발전시키는 역할로 국제적으로 인정받기를 열망합니다. 전 세계 박물관, 갤러리, 컬렉터들과의 전략적 파트너십을 통해 우리가 대표하는 작가들의 글로벌 영향력과 임팩트를 확장하고자 합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Spaces */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="text-3xl mb-12 text-center tracking-wider font-light">우리의 공간</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gallerySpaces.map((space) => (
              <div key={space.id} className="group">
                <div className="relative overflow-hidden mb-4 h-[300px]">
                  <Image
                    src={space.image}
                    alt={space.caption.ko}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-center tracking-wide text-sm">{space.caption.ko}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
