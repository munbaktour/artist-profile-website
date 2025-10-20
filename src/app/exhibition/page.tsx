'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { mockExhibitions } from '@/data/exhibitions'
import type { ExhibitionStatus } from '@/types'

export default function ExhibitionPage() {
  const [activeTab, setActiveTab] = useState<ExhibitionStatus>('current')

  const currentExhibitions = mockExhibitions.filter(ex => ex.status === activeTab)
  const featuredExhibition = currentExhibitions[0] // 첫 번째를 Featured로 표시
  const regularExhibitions = currentExhibitions.slice(1)

  const tabLabels: Record<ExhibitionStatus, string> = {
    current: '현재 전시',
    upcoming: '예정 전시',
    past: '지난 전시',
  }

  return (
    <div className="pt-20 min-h-screen bg-white">
      {/* Tab Navigation */}
      <section className="py-12 px-6 border-b border-gray-200">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-4xl text-center mb-8 tracking-widest font-light">
            EXHIBITIONS
          </h1>
          <div className="flex justify-center gap-8">
            {(['current', 'upcoming', 'past'] as ExhibitionStatus[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm tracking-widest uppercase transition-all ${
                  activeTab === tab
                    ? 'border-b-2 border-black text-black font-medium'
                    : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                {tabLabels[tab]}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Exhibition */}
      {featuredExhibition && (
        <section className="py-16 px-6">
          <div className="max-w-[1440px] mx-auto">
            <Link href={`/exhibition/${featuredExhibition.id}`} className="block">
              <div className="relative group cursor-pointer overflow-hidden">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={featuredExhibition.posterImage}
                    alt={featuredExhibition.title.ko}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
                  <div className="p-8 md:p-12 text-white">
                    <p className="text-xs tracking-widest mb-2 text-gray-300">FEATURED</p>
                    <h2 className="text-4xl md:text-5xl mb-2 text-white tracking-wider font-light">
                      {featuredExhibition.title.ko}
                    </h2>
                    <p className="mb-2 text-lg">{featuredExhibition.title.en}</p>
                    <p className="text-sm mb-1">
                      {new Date(featuredExhibition.startDate).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} - {new Date(featuredExhibition.endDate).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm text-gray-300">{featuredExhibition.location.ko}</p>
                    <button className="mt-6 px-8 py-3 bg-white text-black text-xs tracking-widest hover:bg-gray-200 transition-all">
                      전시 상세보기
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Exhibition Grid */}
      {regularExhibitions.length > 0 && (
        <section className="py-16 px-6">
          <div className="max-w-[1440px] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularExhibitions.map((exhibition) => (
                <Link
                  key={exhibition.id}
                  href={`/exhibition/${exhibition.id}`}
                  className="group cursor-pointer"
                >
                  <div className="relative overflow-hidden mb-4 aspect-[3/4]">
                    <Image
                      src={exhibition.posterImage}
                      alt={exhibition.title.ko}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="text-white text-sm tracking-widest">전시 상세보기</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl tracking-wider font-medium">{exhibition.title.ko}</h3>
                    <p className="text-gray-600">{exhibition.title.en}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(exhibition.startDate).toLocaleDateString('ko-KR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })} - {new Date(exhibition.endDate).toLocaleDateString('ko-KR', {
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                    <p className="text-sm tracking-wide">{exhibition.location.ko}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Archive Message for Past Exhibitions */}
      {activeTab === 'past' && (
        <section className="py-12 px-6 bg-gray-50">
          <div className="max-w-[800px] mx-auto text-center">
            <h3 className="text-2xl mb-4 tracking-wider font-light">
              전시 아카이브
            </h3>
            <p className="text-gray-600 leading-relaxed mb-6">
              설립 이래 우리의 완전한 전시 역사를 탐험해보세요. 각 전시는 획기적인 현대 미술을 선보이려는 우리의 헌신을 대표합니다.
            </p>
            <button className="px-8 py-3 border border-black text-xs tracking-widest hover:bg-black hover:text-white transition-all">
              전체 아카이브 보기
            </button>
          </div>
        </section>
      )}

      {/* Empty State */}
      {currentExhibitions.length === 0 && (
        <section className="py-16 px-6">
          <div className="max-w-[800px] mx-auto text-center">
            <p className="text-gray-500 text-lg">
              현재 {tabLabels[activeTab]}가 없습니다.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}
