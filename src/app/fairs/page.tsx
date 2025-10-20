import Image from 'next/image'
import Link from 'next/link'
import { mockFairs } from '@/data/fairs'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Art Fairs | KWANHOONARTE',
  description: 'Upcoming and past art fair participations',
}

export default function FairsPage() {
  const upcomingFairs = mockFairs.filter(fair => new Date(fair.startDate) > new Date())
  const pastFairs = mockFairs.filter(fair => new Date(fair.endDate) < new Date())

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Header */}
      <section className="py-12 px-6 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-4xl text-center tracking-widest font-light">ART FAIRS</h1>
        </div>
      </section>

      {/* Upcoming Fairs */}
      <section className="py-16 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl mb-12 tracking-wider font-light text-center">
            예정된 페어
          </h2>

          <div className="space-y-12">
            {upcomingFairs.map((fair) => (
              <div key={fair.id} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Date Column */}
                <div className="md:col-span-3 text-center md:text-right">
                  <p className="text-gray-500 text-sm tracking-wider">
                    {new Date(fair.startDate).toLocaleDateString('en-US', { month: 'long' })}
                  </p>
                  <p className="text-xl tracking-wider">
                    {new Date(fair.startDate).getFullYear()}
                  </p>
                </div>

                {/* Fair Card */}
                <div className="md:col-span-9 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-5">
                    <div className="relative md:col-span-2 aspect-[4/3] md:aspect-auto">
                      {fair.image && (
                        <Image
                          src={fair.image}
                          alt={fair.name}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <div className="md:col-span-3 p-8">
                      <h3 className="text-2xl mb-4 tracking-wider font-light">{fair.name}</h3>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p className="flex items-center gap-2">
                          <span className="font-medium">날짜:</span>
                          {new Date(fair.startDate).toLocaleDateString('ko-KR', {
                            month: 'long',
                            day: 'numeric'
                          })} - {new Date(fair.endDate).toLocaleDateString('ko-KR', {
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-medium">장소:</span>
                          {fair.location}
                        </p>
                        {fair.booth && (
                          <p className="flex items-center gap-2">
                            <span className="font-medium">부스:</span>
                            {fair.booth}
                          </p>
                        )}
                      </div>
                      {fair.description && (
                        <p className="mt-4 text-gray-700 leading-relaxed">
                          {fair.description.ko}
                        </p>
                      )}
                      {fair.link && (
                        <Link
                          href={fair.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-6 px-6 py-2 border border-black text-xs tracking-widest hover:bg-black hover:text-white transition-all"
                        >
                          상세 정보 →
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {upcomingFairs.length === 0 && (
            <p className="text-center text-gray-500">현재 예정된 아트페어가 없습니다.</p>
          )}
        </div>
      </section>

      {/* Past Participations */}
      {pastFairs.length > 0 && (
        <section className="py-16 px-6 bg-gray-50">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl mb-12 tracking-wider font-light text-center">
              지난 참여
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {pastFairs.map((fair) => (
                <div key={fair.id} className="text-center">
                  {fair.image && (
                    <div className="relative aspect-square mb-3 overflow-hidden grayscale hover:grayscale-0 transition-all">
                      <Image
                        src={fair.image}
                        alt={fair.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <p className="text-sm font-medium tracking-wide">{fair.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(fair.startDate).getFullYear()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
