import type { Exhibition } from '@/types'

/**
 * 전시 데이터
 * Single Source of Truth - 모든 전시 정보는 이 파일에만 정의
 */
export const mockExhibitions: Exhibition[] = [
  // Current Exhibitions
  {
    id: 'no-man-is-an-island',
    title: {
      ko: 'No man is an island',
      en: 'No man is an island'
    },
    artistIds: ['son-moon-il'],
    status: 'current',
    startDate: '2025-01-09',
    endDate: '2025-02-28',
    location: {
      ko: '관훈아르떼',
      en: 'KWANHOON ARTE'
    },
    description: {
      ko: '손문일 작가의 개인전',
      en: 'Solo Exhibition by Son Moon Il'
    },
    posterImage: '/images/exhibitions/no-man-is-an-island/emain.png',
    images: [
      '/images/exhibitions/no-man-is-an-island/전시모습 1.jpg',
      '/images/exhibitions/no-man-is-an-island/전시모습 2.jpg',
      '/images/exhibitions/no-man-is-an-island/전시모습 3.jpg',
      '/images/exhibitions/no-man-is-an-island/전시모습 4.jpg',
      '/images/exhibitions/no-man-is-an-island/전시모습 5.jpg',
      '/images/exhibitions/no-man-is-an-island/전시모습 6.jpg',
      '/images/exhibitions/no-man-is-an-island/전시모습 7.jpg',
      '/images/exhibitions/no-man-is-an-island/전시모습 8.jpg',
      '/images/exhibitions/no-man-is-an-island/전시모습 9.jpg',
      '/images/exhibitions/no-man-is-an-island/전시모습 10.jpg',
      '/images/exhibitions/no-man-is-an-island/전시모습 11.jpg',
      '/images/exhibitions/no-man-is-an-island/전시모습 12.jpg',
      '/images/exhibitions/no-man-is-an-island/전시모습 13.jpg',
      '/images/exhibitions/no-man-is-an-island/전시모습 14.jpg',
      '/images/exhibitions/no-man-is-an-island/전시모습 15.jpg',
    ],
  },
]

/**
 * 전시 상태별 필터링 헬퍼 함수
 */
export const getExhibitionsByStatus = (status: 'current' | 'upcoming' | 'past') => {
  return mockExhibitions.filter(ex => ex.status === status)
}

/**
 * Featured 전시 가져오기 (각 카테고리의 첫 번째 전시)
 */
export const getFeaturedExhibition = (status: 'current' | 'upcoming' | 'past') => {
  return mockExhibitions.find(ex => ex.status === status)
}
