/**
 * Hero 캐러셀 이미지 데이터
 * Single Source of Truth - Mock 데이터
 */

import type { CarouselImage } from '@/types/components'

export const HERO_IMAGES: CarouselImage[] = [
  {
    id: 'hero-1',
    src: 'https://images.unsplash.com/photo-1748787007524-d4bc8c7621da?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwZW1wdHklMjBzcGFjZXxlbnwxfHx8fDE3NjA2ODc3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: {
      ko: '갤러리 전시 공간 1',
      en: 'Gallery Exhibition Space 1',
    },
    title: {
      ko: 'KWANHOONARTE',
      en: 'KWANHOONARTE',
    },
  },
  {
    id: 'hero-2',
    src: 'https://images.unsplash.com/photo-1513361159116-51e589abc801?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNldW0lMjBpbnRlcmlvciUyMG1pbmltYWx8ZW58MXx8fHwxNzYwNjg3NzY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    alt: {
      ko: '갤러리 전시 공간 2',
      en: 'Gallery Exhibition Space 2',
    },
    title: {
      ko: 'Contemporary Art',
      en: 'Contemporary Art',
    },
  },
  {
    id: 'hero-3',
    src: 'https://images.unsplash.com/photo-1646747149414-e0bd32b1a121?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcnQlMjB3YWxsfGVufDF8fHx8MTc2MDY4Nzc2NXww&ixlib=rb-4.1.0&q=80&w=1080',
    alt: {
      ko: '갤러리 전시 공간 3',
      en: 'Gallery Exhibition Space 3',
    },
    title: {
      ko: 'Art Exhibition',
      en: 'Art Exhibition',
    },
  },
]
