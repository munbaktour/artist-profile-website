import type { Artist } from '@/types'

/**
 * KWANHOONARTE 작가 데이터
 * Single Source of Truth - 모든 작가 정보는 이 파일에만 정의
 */
export const artistsData: Artist[] = [
  {
    id: "kim-hyung-dae",
    name: { ko: '김형대', en: 'Kim Hyung Dae' },
    category: 'featured',
    bio: {
      ko: "김형대는 한국 추상미술의 선구자로, 1960년대 앵포르멜 운동을 주도했다. 1961년 국전에서 추상회화로는 최초로 수상하며 한국 추상미술의 권위를 인정받았다. 2024년 대한민국예술원 회원으로 선출되었다.",
      en: "Kim Hyung Dae is a pioneer of Korean abstract art who led the Informel movement in the 1960s. Elected as a member of the National Academy of Arts in 2024."
    },
    image: "/images/artists/kim-hyung-dae.jpg",
    birthYear: 1936,
    nationality: "한국",
    works: [
      {
        id: "khd-work-01",
        artistId: "kim-hyung-dae",
        title: { ko: "무제 61-A", en: "Untitled 61-A" },
        year: 1961,
        medium: "캔버스에 유채",
        dimensions: "130 x 162 cm",
        image: "/images/artists/kim-hyung-dae/artwork-01.jpg",
        available: true
      },
      {
        id: "khd-work-02",
        artistId: "kim-hyung-dae",
        title: { ko: "추상 68-B", en: "Abstract 68-B" },
        year: 1968,
        medium: "캔버스에 유채",
        dimensions: "145 x 112 cm",
        image: "/images/artists/kim-hyung-dae/artwork-02.jpg",
        available: false
      },
      {
        id: "khd-work-03",
        artistId: "kim-hyung-dae",
        title: { ko: "형상의 리듬", en: "Rhythm of Forms" },
        year: 1975,
        medium: "캔버스에 유채",
        dimensions: "162 x 130 cm",
        image: "/images/artists/kim-hyung-dae/artwork-03.jpg",
        available: true
      }
    ]
  },

  {
    id: "yoo-geun-young",
    name: { ko: '유근영', en: 'Yoo Geun Young' },
    category: 'featured',
    bio: {
      ko: "유근영 작가는 추상과 구상의 경계를 넘나들며 독자적인 조형 언어를 구축해왔다. 강렬한 색채와 역동적인 붓질로 내면의 감정을 캔버스에 표현하며, 한국 현대회화의 새로운 가능성을 제시하고 있다.",
      en: "Yoo Geun Young has developed a unique visual language crossing between abstract and figurative art."
    },
    image: "/images/artists/yoo-geun-young.jpg",
    birthYear: 1948,
    nationality: "한국",
    works: [
      {
        id: "ygy-work-01",
        artistId: "yoo-geun-young",
        title: { ko: "내면의 풍경", en: "Inner Landscape" },
        year: 2015,
        medium: "캔버스에 아크릴",
        dimensions: "100 x 80 cm",
        image: "/images/artists/yoo-geun-young/artwork-01.jpg",
        available: true
      },
      {
        id: "ygy-work-02",
        artistId: "yoo-geun-young",
        title: { ko: "색채의 대화", en: "Dialogue of Colors" },
        year: 2018,
        medium: "캔버스에 혼합재료",
        dimensions: "120 x 120 cm",
        image: "/images/artists/yoo-geun-young/artwork-02.jpg",
        available: true
      }
    ]
  },

  {
    id: "jung-sun-young",
    name: { ko: '일석 정선영', en: 'Jung Sun Young (Il Seok)' },
    category: 'featured',
    bio: {
      ko: "정선영 작가는 동양화의 전통적 기법을 현대적으로 재해석하는 작업을 통해 한국 현대미술계에서 독특한 위치를 차지하고 있다. 전통 재료와 현대적 감각의 조화를 추구하며, 자연과 인간의 관계를 섬세한 필치로 표현한다.",
      en: "Jung Sun Young reinterprets traditional Korean painting techniques through a contemporary lens, holding a unique position in Korean contemporary art."
    },
    image: "/images/artists/jung-sun-young.jpg",
    birthYear: 1961,
    nationality: "한국",
    works: [
      {
        id: "jsy-work-01",
        artistId: "jung-sun-young",
        title: { ko: "청자무늬 민화그릇", en: "Celadon Pattern Folk Painting Bowl" },
        year: 1970,
        medium: "도자기",
        dimensions: "직경 40cm",
        image: "/images/artists/jung-sun-young/artwork-01.jpg",
        available: true
      }
    ]
  },

  {
    id: "byun-geon-ho",
    name: { ko: '변건호', en: 'Byun Geon Ho' },
    category: 'featured',
    bio: {
      ko: "변건호 작가는 도시 풍경과 일상의 순간을 독특한 시각으로 포착하는 작업을 이어오고 있다. 사진과 회화의 경계를 탐구하며, 현실과 환상 사이의 모호한 지점을 시각화한다.",
      en: "Byun Geon Ho captures urban landscapes and everyday moments through a unique perspective, exploring the boundary between photography and painting."
    },
    image: "/images/artists/byun-geon-ho.jpg",
    birthYear: 1948,
    nationality: "한국",
    works: [
      {
        id: "bgh-work-01",
        artistId: "byun-geon-ho",
        title: { ko: "서울의 밤", en: "Seoul Night" },
        year: 2020,
        medium: "사진 위 혼합재료",
        dimensions: "90 x 60 cm",
        image: "/images/artists/byun-geon-ho/artwork-01.jpg",
        available: true
      },
      {
        id: "bgh-work-02",
        artistId: "byun-geon-ho",
        title: { ko: "도시의 기억", en: "Urban Memory" },
        year: 2021,
        medium: "디지털 프린트",
        dimensions: "110 x 75 cm",
        image: "/images/artists/byun-geon-ho/artwork-02.jpg",
        available: false
      },
      {
        id: "bgh-work-03",
        artistId: "byun-geon-ho",
        title: { ko: "일상의 순간들", en: "Everyday Moments" },
        year: 2022,
        medium: "사진 위 혼합재료",
        dimensions: "80 x 120 cm",
        image: "/images/artists/byun-geon-ho/artwork-03.jpg",
        available: true
      }
    ]
  },

  {
    id: "son-moon-il",
    name: { ko: '손문일', en: 'Son Moon Il' },
    category: 'emerging',
    bio: {
      ko: "손문일은 서울대학교 동양화과를 졸업하고 북경 중앙미술학원에서 수학했다. 대상의 본질에 대한 물음에서 출발하여 오브제를 활용한 독특한 작업 세계를 구축했다. 전통과 현대, 동양과 서양의 경계를 넘나들며 독자적인 예술 언어를 탐구하고 있다.",
      en: "Son Moon Il graduated from Seoul National University and studied at the Central Academy of Fine Arts in Beijing. He explores unique artistic language crossing boundaries between tradition and contemporary."
    },
    image: "/images/artists/son-moon-il.jpg",
    birthYear: 1980,
    nationality: "한국",
    works: [
      {
        id: "smi-work-01",
        artistId: "son-moon-il",
        title: { ko: "경계의 탐구", en: "Exploring Boundaries" },
        year: 2019,
        medium: "한지에 먹과 오브제",
        dimensions: "70 x 100 cm",
        image: "/images/artists/son-moon-il/artwork-01.jpg",
        available: true
      },
      {
        id: "smi-work-02",
        artistId: "son-moon-il",
        title: { ko: "본질을 찾아서", en: "Searching for Essence" },
        year: 2021,
        medium: "혼합재료",
        dimensions: "90 x 90 cm",
        image: "/images/artists/son-moon-il/artwork-02.jpg",
        available: true
      }
    ]
  }
]

// 기존 코드 호환성을 위한 별칭
export const mockArtists = artistsData
