import type { Artist } from '@/types'

/**
 * KWANHOONARTE 작가 데이터
 * Single Source of Truth - 모든 작가 정보는 이 파일에만 정의
 */
export const mockArtists: Artist[] = [
  {
    id: '1',
    name: { ko: '정선영', en: 'Jung Sun Young' },
    category: 'featured',
    bio: {
      ko: '동물과 식물이 아름답게 공존하는 낙원의 모습을 그리는 작가',
      en: 'Artist depicting paradise where animals and plants beautifully coexist'
    },
    image: '/images/artists/jung-sun-young.jpg',
    nationality: '대한민국',
    location: '인도네시아 자카르타',
    exhibitions: [
      '<공존> 시리즈',
      '<공존의 숲> 시리즈',
      '<이국적인 풍경> 시리즈',
      '<봄의 정원> 시리즈'
    ],
  },
  {
    id: '2',
    name: { ko: '유근영', en: 'Yoo Geun Young' },
    category: 'featured',
    bio: {
      ko: '한국적 표현주의 화가로 구상과 비구상의 경계를 자유롭게 넘나드는 작가',
      en: 'Korean expressionist painter freely crossing boundaries between figurative and non-figurative art'
    },
    image: '/images/artists/yoo-geun-young.jpg',
    nationality: '대한민국',
    birthYear: 1948,
    education: [
      '1974 홍익대학교 미술대학 회화과 졸업',
      '1985 홍익대학교 대학원 미학과 졸업'
    ],
    exhibitions: [
      '2005 대전시립미술관 개인전',
      '2001-2007 총 35회 개인전 개최',
      '한남대, 목원대, 충남대 출강'
    ],
  },
  {
    id: '3',
    name: { ko: '손문일', en: 'Son Moon Il' },
    category: 'featured',
    bio: {
      ko: '동서양 회화를 융합하며 재료와 작가의 관계를 탐구하는 작가',
      en: 'Artist exploring the relationship between materials and artist by fusing Eastern and Western painting'
    },
    image: '/images/artists/son-moon-il.jpg',
    nationality: '대한민국',
    education: [
      '서울대학교 미술대학 동양화 전공',
      '북경 중앙미술대학원 벽화과 졸업',
      '중앙대학교 예술학 수료'
    ],
    exhibitions: [
      '서울, 북경, 베니스 등에서 총 10회 개인전',
      '북경 중앙미술관, 성곡미술관, 암웨이 미술관 등 단체전 참여'
    ],
  },
  {
    id: '4',
    name: { ko: '변건호', en: 'Byun Geon Ho' },
    category: 'featured',
    bio: {
      ko: '전통과 현대, 동양과 서양의 조화를 추구하는 작가',
      en: 'Artist pursuing harmony between tradition and modernity, East and West'
    },
    image: '/images/artists/byun-geon-ho.jpg',
    nationality: '대한민국',
    education: [
      '중앙대학교 예술대학 한국화과 졸업',
      '중앙대학교 일반대학원 회화과 석사 졸업'
    ],
    exhibitions: [
      '개인전 18회 개최',
      '국내외 그룹전 다수 참여'
    ],
  },
  {
    id: '5',
    name: { ko: '김형대', en: 'Kim Hyung Dae' },
    category: 'featured',
    bio: {
      ko: '한국 앵포르멜 미술의 선구자로 추상미술의 제도적 승인에 기여한 작가',
      en: 'Pioneer of Korean Art Informel who contributed to the institutional recognition of abstract art'
    },
    image: '/images/artists/kim-hyung-dae.jpg',
    nationality: '대한민국',
    birthYear: 1936,
    education: [
      '홍익대학교 미술대학 회화과 졸업'
    ],
    exhibitions: [
      '2016 김형대 회고전, 국립현대미술관, 개인전',
      '1961 대한민국미술전람회 국가재건최고회의 의장상 수상',
      '<환원 B> (1961) - 한국 추상미술사의 기념비적 작품',
      '<후광> 연작 (1970년대-2012년)'
    ],
  },
]
