import type { Fair } from '@/types'

/**
 * Mock 아트페어 데이터
 */
export const mockFairs: Fair[] = [
  {
    id: '1',
    name: 'ART BASEL HONG KONG',
    location: 'Hong Kong Convention Center',
    startDate: '2026-03-28',
    endDate: '2026-03-30',
    booth: 'Booth E15',
    description: {
      ko: '아시아 최대 규모의 국제 아트페어',
      en: 'Asia\'s largest international art fair'
    },
    image: 'https://images.unsplash.com/photo-1716340970784-a629b8cad6b5?w=1080&q=80',
    link: 'https://www.artbasel.com/hong-kong'
  },
  {
    id: '2',
    name: 'FRIEZE SEOUL',
    location: 'COEX, Seoul',
    startDate: '2026-09-06',
    endDate: '2026-09-08',
    booth: 'Booth B24',
    description: {
      ko: '서울에서 열리는 프리즈 아트페어',
      en: 'Frieze Art Fair in Seoul'
    },
    image: 'https://images.unsplash.com/photo-1743119638006-a01d4625745d?w=1080&q=80',
    link: 'https://www.frieze.com/fairs/frieze-seoul'
  },
  {
    id: '3',
    name: 'KIAF SEOUL',
    location: 'COEX, Seoul',
    startDate: '2026-10-10',
    endDate: '2026-10-13',
    booth: 'Booth A12',
    description: {
      ko: '한국 국제 아트페어',
      en: 'Korea International Art Fair'
    },
    image: 'https://images.unsplash.com/photo-1716340970784-a629b8cad6b5?w=1080&q=80',
    link: 'https://www.kiaf.org'
  },
]

export const getUpcomingFairs = () => {
  const now = new Date()
  return mockFairs.filter(fair => new Date(fair.startDate) > now)
}

export const getPastFairs = () => {
  const now = new Date()
  return mockFairs.filter(fair => new Date(fair.endDate) < now)
}
