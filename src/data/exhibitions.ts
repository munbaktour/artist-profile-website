import type { Exhibition } from '@/types'

/**
 * Mock 전시 데이터
 * Single Source of Truth - 모든 전시 정보는 이 파일에만 정의
 */
export const mockExhibitions: Exhibition[] = [
  // Current Exhibitions
  {
    id: '1',
    title: {
      ko: '현대적 시선',
      en: 'CONTEMPORARY VISIONS'
    },
    status: 'current',
    startDate: '2024-10-15',
    endDate: '2024-12-20',
    location: {
      ko: '관훈아르테 서울',
      en: 'kwanhoonarte Seoul'
    },
    description: {
      ko: '동시대 한국 작가들의 다양한 시각을 담은 그룹전',
      en: 'Group exhibition featuring diverse perspectives from contemporary Korean artists'
    },
    posterImage: 'https://images.unsplash.com/photo-1723974591057-ccadada1f283?w=1080&q=80',
  },
  {
    id: '2',
    title: {
      ko: '조각된 형태',
      en: 'SCULPTED FORMS'
    },
    artistIds: ['2'],
    status: 'current',
    startDate: '2024-10-20',
    endDate: '2024-11-30',
    location: {
      ko: '메인 갤러리',
      en: 'Main Gallery'
    },
    description: {
      ko: '장웨이 작가의 대형 설치 작품 개인전',
      en: 'Solo exhibition of Zhang Wei\'s large-scale installation works'
    },
    posterImage: 'https://images.unsplash.com/photo-1759608542767-e1a7c3ac09a5?w=1080&q=80',
  },
  {
    id: '3',
    title: {
      ko: '추상적 표현',
      en: 'ABSTRACT EXPRESSIONS'
    },
    artistIds: ['3'],
    status: 'current',
    startDate: '2024-10-10',
    endDate: '2024-12-15',
    location: {
      ko: '프로젝트 공간',
      en: 'Project Space'
    },
    description: {
      ko: '이민정 작가의 추상 회화 신작 전시',
      en: 'New abstract paintings by Lee Min-jung'
    },
    posterImage: 'https://images.unsplash.com/photo-1615909407710-9fe4c6b11f97?w=1080&q=80',
  },

  // Upcoming Exhibitions
  {
    id: '4',
    title: {
      ko: '디지털 지평',
      en: 'DIGITAL HORIZONS'
    },
    artistIds: ['1'],
    status: 'upcoming',
    startDate: '2025-01-15',
    endDate: '2025-03-20',
    location: {
      ko: '관훈아르테 서울',
      en: 'kwanhoonarte Seoul'
    },
    description: {
      ko: '김서연 작가의 디지털 미디어 아트 개인전',
      en: 'Solo exhibition of Kim Seo-yeon\'s digital media art'
    },
    posterImage: 'https://images.unsplash.com/photo-1723242017406-7a7630de23c1?w=1080&q=80',
  },
  {
    id: '5',
    title: {
      ko: '문화적 서사',
      en: 'CULTURAL NARRATIVES'
    },
    artistIds: ['4'],
    status: 'upcoming',
    startDate: '2025-02-05',
    endDate: '2025-04-10',
    location: {
      ko: '메인 갤러리',
      en: 'Main Gallery'
    },
    description: {
      ko: '마리아 산토스의 문화 정체성을 탐구하는 전시',
      en: 'Maria Santos explores cultural identity through sculpture'
    },
    posterImage: 'https://images.unsplash.com/photo-1723974591057-ccadada1f283?w=1080&q=80',
  },

  // Past Exhibitions
  {
    id: '6',
    title: {
      ko: '시대를 초월한 관점',
      en: 'TIMELESS PERSPECTIVES'
    },
    artistIds: ['5'],
    status: 'past',
    startDate: '2024-07-10',
    endDate: '2024-09-20',
    location: {
      ko: '관훈아르테 서울',
      en: 'kwanhoonarte Seoul'
    },
    description: {
      ko: '박지훈 작가의 사진과 디지털 미디어 작업',
      en: 'Photography and digital media works by Park Ji-hoon'
    },
    posterImage: 'https://images.unsplash.com/photo-1615909407710-9fe4c6b11f97?w=1080&q=80',
  },
  {
    id: '7',
    title: {
      ko: '재료의 대화',
      en: 'MATERIAL DIALOGUES'
    },
    artistIds: ['7'],
    status: 'past',
    startDate: '2024-05-15',
    endDate: '2024-07-05',
    location: {
      ko: '프로젝트 공간',
      en: 'Project Space'
    },
    description: {
      ko: '최하나 작가의 혼합 재료 회화 전시',
      en: 'Mixed media paintings by Choi Hana'
    },
    posterImage: 'https://images.unsplash.com/photo-1759608542767-e1a7c3ac09a5?w=1080&q=80',
  },
  {
    id: '8',
    title: {
      ko: '도시의 반영',
      en: 'URBAN REFLECTIONS'
    },
    status: 'past',
    startDate: '2024-03-01',
    endDate: '2024-05-10',
    location: {
      ko: '메인 갤러리',
      en: 'Main Gallery'
    },
    description: {
      ko: '도시 풍경을 다룬 그룹전',
      en: 'Group exhibition exploring urban landscapes'
    },
    posterImage: 'https://images.unsplash.com/photo-1723242017406-7a7630de23c1?w=1080&q=80',
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
