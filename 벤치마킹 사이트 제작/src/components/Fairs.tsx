import { ImageWithFallback } from './figma/ImageWithFallback';
import { LanguageType } from '../App';

interface FairsProps {
  language: LanguageType;
}

export function Fairs({ language }: FairsProps) {
  const upcomingFairs = [
    {
      id: 1,
      name: 'ART BASEL HONG KONG',
      date: 'March 28-30, 2026',
      booth: 'Booth E15',
      location: 'Hong Kong Convention Center',
      image: 'https://images.unsplash.com/photo-1716340970784-a629b8cad6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBmYWlyJTIwYm9vdGh8ZW58MXx8fHwxNzYwOTI1MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      month: 'March',
      year: '2026',
    },
    {
      id: 2,
      name: 'FRIEZE SEOUL',
      date: 'September 6-8, 2026',
      booth: 'Booth B24',
      location: 'COEX, Seoul',
      image: 'https://images.unsplash.com/photo-1743119638006-a01d4625745d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBleGhpYml0aW9uJTIwYm9vdGh8ZW58MXx8fHwxNzYwOTI1MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      month: 'September',
      year: '2026',
    },
    {
      id: 3,
      name: 'KIAF SEOUL',
      date: 'October 10-13, 2026',
      booth: 'Booth A12',
      location: 'COEX, Seoul',
      image: 'https://images.unsplash.com/photo-1716340970784-a629b8cad6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBmYWlyJTIwYm9vdGh8ZW58MXx8fHwxNzYwOTI1MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      month: 'October',
      year: '2026',
    },
  ];

  const pastParticipations = [
    { id: 4, name: 'ART BASEL HONG KONG', year: '2025', image: 'https://images.unsplash.com/photo-1743119638006-a01d4625745d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBleGhpYml0aW9uJTIwYm9vdGh8ZW58MXx8fHwxNzYwOTI1MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 5, name: 'FRIEZE SEOUL', year: '2025', image: 'https://images.unsplash.com/photo-1716340970784-a629b8cad6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBmYWlyJTIwYm9vdGh8ZW58MXx8fHwxNzYwOTI1MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 6, name: 'KIAF SEOUL', year: '2025', image: 'https://images.unsplash.com/photo-1743119638006-a01d4625745d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBleGhpYml0aW9uJTIwYm9vdGh8ZW58MXx8fHwxNzYwOTI1MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 7, name: 'ART TAIPEI', year: '2024', image: 'https://images.unsplash.com/photo-1716340970784-a629b8cad6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBmYWlyJTIwYm9vdGh8ZW58MXx8fHwxNzYwOTI1MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 8, name: 'SINGAPORE ART FAIR', year: '2024', image: 'https://images.unsplash.com/photo-1743119638006-a01d4625745d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBleGhpYml0aW9uJTIwYm9vdGh8ZW58MXx8fHwxNzYwOTI1MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
    { id: 9, name: 'ART BUSAN', year: '2024', image: 'https://images.unsplash.com/photo-1716340970784-a629b8cad6b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBmYWlyJTIwYm9vdGh8ZW58MXx8fHwxNzYwOTI1MTUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' },
  ];

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 px-6 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-center tracking-widest">ART FAIRS</h1>
        </div>
      </section>

      {/* Upcoming Fairs - Timeline Layout */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="mb-12 tracking-wider text-center">
            {language === 'en' ? 'Upcoming Fairs' : '예정된 페어'}
          </h2>
          
          <div className="space-y-12">
            {upcomingFairs.map((fair) => (
              <div key={fair.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Date Column */}
                <div className="md:col-span-3 text-center md:text-right">
                  <p className="text-gray-500 text-sm tracking-wider">{fair.month}</p>
                  <p className="text-xl tracking-wider">{fair.year}</p>
                </div>

                {/* Fair Card */}
                <div className="md:col-span-9 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-2">
                      <ImageWithFallback
                        src={fair.image}
                        alt={fair.name}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <h3 className="mb-4 tracking-wider">{fair.name}</h3>
                        <p className="text-sm mb-2 text-gray-600">{fair.date}</p>
                        <p className="text-sm mb-2">{fair.booth}</p>
                        <p className="text-sm text-gray-600">{fair.location}</p>
                      </div>
                      <div className="flex gap-4 mt-6">
                        <button className="px-6 py-2 border border-black text-xs tracking-widest hover:bg-black hover:text-white transition-all">
                          PREVIEW
                        </button>
                        <button className="px-6 py-2 bg-black text-white text-xs tracking-widest hover:bg-gray-800 transition-all">
                          RSVP
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Participations */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-[1440px] mx-auto">
          <h2 className="mb-12 tracking-wider text-center">
            {language === 'en' ? 'Past Participations' : '과거 참가 내역'}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {pastParticipations.map((fair) => (
              <div key={fair.id} className="group cursor-pointer">
                <div className="relative overflow-hidden mb-4 aspect-[4/3]">
                  <ImageWithFallback
                    src={fair.image}
                    alt={fair.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-white text-sm tracking-widest">VIEW HIGHLIGHTS</span>
                  </div>
                </div>
                <h3 className="tracking-wide mb-1">{fair.name}</h3>
                <p className="text-sm text-gray-600">{fair.year}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-[800px] mx-auto text-center">
          <h3 className="mb-6 tracking-wider">
            {language === 'en' ? 'Visit Us at Art Fairs' : '아트페어에서 만나요'}
          </h3>
          <p className="text-gray-700 leading-relaxed mb-8">
            {language === 'en'
              ? 'kwanhoonarte participates in major international art fairs throughout the year, presenting exceptional works by our represented artists. We invite collectors, curators, and art enthusiasts to visit our booths and discover groundbreaking contemporary art from Asia and beyond.'
              : '관훈아르테는 연중 주요 국제 아트페어에 참가하여 우리가 대표하는 작가들의 뛰어난 작품을 선보입니다. 컬렉터, 큐레이터, 미술 애호가 여러분을 우리 부스로 초대하여 아시아와 그 너머의 획기적인 현대 미술을 발견하시기 바랍니다.'}
          </p>
          <button className="px-8 py-3 border border-black text-xs tracking-widest hover:bg-black hover:text-white transition-all">
            SCHEDULE A PRIVATE VIEWING
          </button>
        </div>
      </section>
    </div>
  );
}
