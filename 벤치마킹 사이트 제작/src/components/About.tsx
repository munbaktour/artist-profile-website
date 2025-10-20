import { ImageWithFallback } from './figma/ImageWithFallback';
import { LanguageType } from '../App';

interface AboutProps {
  language: LanguageType;
}

export function About({ language }: AboutProps) {
  const gallerySpaces = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1663736244030-1e3fdc47c84c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcnQlMjBnYWxsZXJ5JTIwaW50ZXJpb3J8ZW58MXx8fHwxNzYwOTI1MDM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: { en: 'Main Exhibition Hall', kr: '메인 전시홀' },
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1535056889777-5821f7c5b4ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwZ2FsbGVyeSUyMHNwYWNlfGVufDF8fHx8MTc2MDkyNTAzNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: { en: 'Project Space', kr: '프로젝트 공간' },
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1743119638006-a01d4625745d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGdhbGxlcnklMjBleGhpYml0aW9uJTIwcm9vbXxlbnwxfHx8fDE3NjA5MjUwMzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      caption: { en: 'Viewing Room', kr: '뷰잉룸' },
    },
  ];

  const team = [
    { id: 1, name: 'Kim Kwanhoon', title: { en: 'Founder & Director', kr: '설립자 및 관장' }, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400' },
    { id: 2, name: 'Lee Minjae', title: { en: 'Curator', kr: '큐레이터' }, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400' },
    { id: 3, name: 'Park Soyeon', title: { en: 'Gallery Manager', kr: '갤러리 매니저' }, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400' },
    { id: 4, name: 'Choi Junho', title: { en: 'Marketing Director', kr: '마케팅 이사' }, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400' },
  ];

  const content = {
    en: {
      galleryTitle: 'Contemporary Art Gallery',
      intro1: 'kwanhoonarte is a leading contemporary art gallery based in Seoul, dedicated to showcasing innovative works by emerging and established artists from Korea and around the world. Since our founding, we have been committed to fostering dialogue between Eastern and Western artistic traditions.',
      intro2: 'Our gallery serves as a platform for critical discourse and cultural exchange, presenting exhibitions that challenge conventional boundaries and explore new perspectives in contemporary art. We believe in the transformative power of art to inspire, provoke, and connect communities.',
      intro3: 'Through our carefully curated exhibitions, artist collaborations, and public programs, we aim to make contemporary art accessible to diverse audiences while supporting the careers of visionary artists who are shaping the future of art.',
      philosophy: 'Our Philosophy',
      philosophyText: 'We believe that art transcends cultural and geographical boundaries, serving as a universal language that connects people across different backgrounds. Our approach is rooted in authenticity, innovation, and a deep respect for artistic integrity. We are committed to presenting works that not only demonstrate exceptional craftsmanship but also engage with the pressing social, cultural, and environmental issues of our time.',
      vision: 'Our Vision',
      visionText: 'Our vision is to establish kwanhoonarte as a vital cultural hub in Asia\'s contemporary art landscape. We aspire to be recognized internationally for our commitment to artistic excellence and our role in advancing the careers of groundbreaking artists. Through strategic partnerships with museums, galleries, and collectors worldwide, we aim to expand the global reach and impact of the artists we represent.',
      ourSpaces: 'Our Spaces',
      ourTeam: 'Our Team',
      address: 'Address',
      hours: 'Hours',
      contact: 'Contact',
    },
    kr: {
      galleryTitle: '서울의 현대 미술 갤러리',
      intro1: '관훈아르테는 서울을 기반으로 한 현대 미술 갤러리로, 한국과 전 세계의 신진 및 기성 작가들의 혁신적인 작품을 선보이는 데 전념하고 있습니다. 설립 이래 우리는 동서양 예술 전통 간의 대화를 촉진하는 데 헌신해 왔습니다.',
      intro2: '우리 갤러리는 비평적 담론과 문화 교류를 위한 플랫폼 역할을 하며, 기존의 경계에 도전하고 현대 미술의 새로운 관점을 탐구하는 전시를 선보입니다. 우리는 예술의 변혁적 힘이 영감을 주고, 자극하며, 공동체를 연결한다고 믿습니다.',
      intro3: '신중하게 기획된 전시, 작가 협업, 공공 프로그램을 통해 우리는 현대 미술을 다양한 관객에게 접근 가능하게 만들고, 미래의 예술을 형성하는 비전있는 작가들의 경력을 지원하고자 합니다.',
      philosophy: '우리의 철학',
      philosophyText: '우리는 예술이 문화적, 지리적 경계를 초월하여 서로 다른 배경을 가진 사람들을 연결하는 보편적 언어 역할을 한다고 믿습니다. 우리의 접근 방식은 진정성, 혁신, 그리고 예술적 진실성에 대한 깊은 존중에 뿌리를 두고 있습니다. 우리는 뛰어난 장인 정신을 보여줄 뿐만 아니라 우리 시대의 긴급한 사회적, 문화적, 환경적 문제에 참여하는 작품을 선보이는 데 전념합니다.',
      vision: '우리의 비전',
      visionText: '우리의 비전은 관훈아르테를 아시아 현대 미술계의 중요한 문화 허브로 확립하는 것입니다. 우리는 예술적 우수성에 대한 헌신과 획기적인 작가들의 경력을 발전시키는 역할로 국제적으로 인정받기를 열망합니다. 전 세계 박물관, 갤러리, 컬렉터들과의 전략적 파트너십을 통해 우리가 대표하는 작가들의 글로벌 영향력과 임팩트를 확장하고자 합니다.',
      ourSpaces: '우리의 공간',
      ourTeam: '우리 팀',
      address: '주소',
      hours: '운영 시간',
      contact: '연락처',
    },
  };

  const t = content[language];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1760622728897-a416b28c9c2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjBzcGFjZSUyMGVtcHR5fGVufDF8fHx8MTc2MDkyNTAzNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Gallery Space"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <h1 className="text-white text-5xl md:text-6xl tracking-widest">
            ABOUT KWANHOONARTE
          </h1>
        </div>
      </section>

      {/* Gallery Introduction */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <h2 className="mb-8 tracking-wider">{t.galleryTitle}</h2>
          <div className="space-y-6 text-gray-700 leading-relaxed">
            <p>{t.intro1}</p>
            <p>{t.intro2}</p>
            <p>{t.intro3}</p>
          </div>
        </div>
      </section>

      {/* Philosophy & Vision */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="mb-6 tracking-wider">{t.philosophy}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t.philosophyText}
              </p>
            </div>
            <div>
              <h3 className="mb-6 tracking-wider">{t.vision}</h3>
              <p className="text-gray-700 leading-relaxed">
                {t.visionText}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Spaces */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="mb-12 text-center tracking-wider">{t.ourSpaces}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {gallerySpaces.map((space) => (
              <div key={space.id} className="group">
                <div className="overflow-hidden mb-4">
                  <ImageWithFallback
                    src={space.image}
                    alt={space.caption[language]}
                    className="w-full h-[300px] object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="text-center tracking-wide text-sm">{space.caption[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="mb-12 text-center tracking-wider">{t.ourTeam}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {team.map((member) => (
              <div key={member.id} className="text-center">
                <div className="mb-4 overflow-hidden rounded-full w-40 h-40 mx-auto">
                  <ImageWithFallback
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="tracking-wide mb-1">{member.name}</h4>
                <p className="text-sm text-gray-600">{member.title[language]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Footer */}
      <section className="py-16 px-6 bg-black text-white">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
            <div>
              <h4 className="mb-4 tracking-wider">{t.address}</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {language === 'en' ? (
                  <>
                    123 Gangnam-daero<br />
                    Gangnam-gu, Seoul<br />
                    South Korea 06090
                  </>
                ) : (
                  <>
                    서울시 강남구<br />
                    강남대로 123<br />
                    우편번호 06090
                  </>
                )}
              </p>
            </div>
            <div>
              <h4 className="mb-4 tracking-wider">{t.hours}</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                {language === 'en' ? (
                  <>
                    Tuesday - Saturday<br />
                    11:00 AM - 7:00 PM<br />
                    Sunday: 12:00 PM - 6:00 PM<br />
                    Closed Mondays
                  </>
                ) : (
                  <>
                    화요일 - 토요일<br />
                    오전 11시 - 오후 7시<br />
                    일요일: 오후 12시 - 오후 6시<br />
                    월요일 휴관
                  </>
                )}
              </p>
            </div>
            <div>
              <h4 className="mb-4 tracking-wider">{t.contact}</h4>
              <p className="text-sm text-gray-300 leading-relaxed">
                Tel: +82 2 1234 5678<br />
                Email: info@kwanhoonarte.com<br />
                Instagram: @kwanhoonarte
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
