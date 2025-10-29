import type { News } from '@/types'

/**
 * Mock 뉴스 데이터
 */
export const mockNews: News[] = [
  {
    id: '1',
    title: {
      ko: '관훈아르떼 뉴욕 확장 발표',
      en: 'kwanhoonarte Announces Major Expansion to New York'
    },
    category: 'press',
    date: '2024-10-18',
    thumbnailImage: 'https://images.unsplash.com/photo-1591643018014-431ac4cd4edc?w=1080&q=80',
    content: {
      ko: '현대 미술 갤러리 관훈아르떼가 뉴욕 첼시 지구에 새로운 갤러리 공간을 오픈한다고 발표했습니다.',
      en: 'Leading contemporary art gallery kwanhoonarte announces the opening of a new gallery space in New York\'s Chelsea district.'
    },
    author: '갤러리 편집부',
  },
  {
    id: '2',
    title: {
      ko: '아트 아시아 매거진에 소개된 현대적 시선 전시',
      en: 'Contemporary Visions Exhibition Featured in Art Asia Magazine'
    },
    category: 'press',
    date: '2024-10-15',
    thumbnailImage: 'https://images.unsplash.com/photo-1600227338741-9ec29e846b58?w=1080&q=80',
    content: {
      ko: '아트 아시아 매거진이 우리의 현재 그룹 전시를 특집으로 다루었습니다.',
      en: 'Art Asia Magazine features our current group exhibition.'
    },
    author: '갤러리 편집부',
  },
  {
    id: '3',
    title: {
      ko: '갤러리 오프닝 리셉션: 10월 28일',
      en: 'Gallery Opening Reception: October 28'
    },
    category: 'exhibition',
    date: '2024-10-12',
    thumbnailImage: 'https://images.unsplash.com/photo-1596649300028-340ad0ec6146?w=1080&q=80',
    content: {
      ko: '아시아 전역의 신진 작가들을 소개하는 최신 전시의 오프닝 리셉션에 여러분을 초대합니다.',
      en: 'Join us for the opening reception of our latest exhibition featuring emerging artists from across Asia.'
    },
    author: '갤러리 편집부',
  },
  {
    id: '4',
    title: {
      ko: '장웨이 작가, 권위 있는 국제상 수상',
      en: 'Artist Zhang Wei Wins Prestigious International Award'
    },
    category: 'award',
    date: '2024-10-10',
    thumbnailImage: 'https://images.unsplash.com/photo-1591643018014-431ac4cd4edc?w=1080&q=80',
    content: {
      ko: '갤러리 소속 작가 장웨이가 2024 아시아 현대 미술상을 수상했습니다.',
      en: 'Gallery artist Zhang Wei has been awarded the prestigious Asian Contemporary Art Prize 2024.'
    },
    author: '갤러리 편집부',
  },
]

export const getNewsByCategory = (category?: News['category']) => {
  if (!category) return mockNews
  return mockNews.filter(news => news.category === category)
}
