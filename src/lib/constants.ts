/**
 * 프로젝트 전역 상수 정의
 * Single Source of Truth - 모든 상수는 이 파일에만 정의
 */

// ============================================
// 네비게이션
// ============================================
export const NAVIGATION_ITEMS = [
  { href: '/', label: { ko: '홈', en: 'Home' } },
  { href: '/about', label: { ko: '소개', en: 'About' } },
  { href: '/artists', label: { ko: '작가', en: 'Artists' } },
  { href: '/exhibition', label: { ko: '전시', en: 'Exhibition' } },
  { href: '/fairs', label: { ko: '페어', en: 'Fairs' } },
  { href: '/news', label: { ko: '소식', en: 'News' } },
  { href: '/contact', label: { ko: '문의', en: 'Contact' } },
] as const

// ============================================
// 언어 설정
// ============================================
export const LANGUAGES = {
  KR: 'ko',
  EN: 'en',
} as const

export const DEFAULT_LANGUAGE = LANGUAGES.KR

// ============================================
// 캐러셀 설정
// ============================================
export const CAROUSEL_SETTINGS = {
  AUTO_PLAY_INTERVAL: 6000, // 6초
  PREVIEW_COUNT_DESKTOP: 3, // Desktop: 3개 미리보기
  PREVIEW_COUNT_MOBILE: 1, // Mobile: 1개
  TRANSITION_DURATION: 300, // 0.3초
} as const

// ============================================
// 페이지 설정
// ============================================
export const PAGE_SIZES = {
  ARTISTS_PER_PAGE: 12,
  NEWS_PER_PAGE: 10,
  EXHIBITIONS_PER_PAGE: 9,
} as const

// ============================================
// 작가 필터
// ============================================
export const ARTIST_FILTERS = {
  ALL: 'all',
  FEATURED: 'featured',
  EMERGING: 'emerging',
} as const

// ============================================
// 전시 상태
// ============================================
export const EXHIBITION_STATUS = {
  CURRENT: 'current',
  UPCOMING: 'upcoming',
  PAST: 'past',
} as const

// ============================================
// Contact Form
// ============================================
export const CONTACT_FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  PHONE: 'phone',
  MESSAGE: 'message',
} as const

export const CONTACT_FORM_VALIDATION = {
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
  MESSAGE_MIN_LENGTH: 10,
  MESSAGE_MAX_LENGTH: 1000,
} as const

// ============================================
// 소셜 미디어 (예시)
// ============================================
export const SOCIAL_LINKS = {
  INSTAGRAM: 'https://instagram.com/kwanhoonarte',
  FACEBOOK: 'https://facebook.com/kwanhoonarte',
  // 실제 링크로 교체 필요
} as const

// ============================================
// 갤러리 정보
// ============================================
export const GALLERY_INFO = {
  NAME: 'KWANHOONARTE',
  EMAIL: 'kwanhoonarte@gmail.com',
  PHONE: '02-720-4028',
  ADDRESS: {
    ko: '서울 종로구 관훈동 인사동5길 12 2층',
    en: '2F, 12, Insadong 5-gil, Gwanhun-dong, Jongno-gu, Seoul',
  },
} as const

// ============================================
// SEO 기본값
// ============================================
export const SEO_DEFAULTS = {
  TITLE_TEMPLATE: '%s | KWANHOONARTE',
  DEFAULT_TITLE: 'KWANHOONARTE - Contemporary Art Gallery',
  DESCRIPTION: {
    ko: '현대 미술 갤러리 KWANHOONARTE',
    en: 'KWANHOONARTE Contemporary Art Gallery',
  },
  KEYWORDS: ['art', 'gallery', 'contemporary art', '미술', '갤러리', '현대미술'],
} as const

// ============================================
// 브레이크포인트 (Tailwind와 동일하게)
// ============================================
export const BREAKPOINTS = {
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  '2XL': 1536,
} as const

// ============================================
// 애니메이션 지속시간
// ============================================
export const ANIMATION_DURATION = {
  FAST: 150,
  NORMAL: 300,
  SLOW: 500,
} as const

// ============================================
// 다국어 번역 데이터
// ============================================
export const TRANSLATIONS = {
  about: {
    hero: {
      title: {
        ko: 'ABOUT KWANHOONARTE',
        en: 'ABOUT KWANHOONARTE',
      },
    },
    introduction: {
      title: {
        ko: '서울의 현대 미술 갤러리',
        en: 'Contemporary Art Gallery in Seoul',
      },
      paragraphs: {
        ko: [
          '관훈아르테는 서울을 기반으로 한 현대 미술 갤러리로, 한국과 전 세계의 신진 및 기성 작가들의 혁신적인 작품을 선보이는 데 전념하고 있습니다. 설립 이래 우리는 동서양 예술 전통 간의 대화를 촉진하는 데 헌신해 왔습니다.',
          '우리 갤러리는 비평적 담론과 문화 교류를 위한 플랫폼 역할을 하며, 기존의 경계에 도전하고 현대 미술의 새로운 관점을 탐구하는 전시를 선보입니다. 우리는 예술의 변혁적 힘이 영감을 주고, 자극하며, 공동체를 연결한다고 믿습니다.',
          '신중하게 기획된 전시, 작가 협업, 공공 프로그램을 통해 우리는 현대 미술을 다양한 관객에게 접근 가능하게 만들고, 미래의 예술을 형성하는 비전있는 작가들의 경력을 지원하고자 합니다.',
        ],
        en: [
          'KWANHOONARTE is a contemporary art gallery based in Seoul, dedicated to showcasing innovative work by both emerging and established artists from Korea and around the world. Since our founding, we have been committed to fostering dialogue between Eastern and Western artistic traditions.',
          'Our gallery serves as a platform for critical discourse and cultural exchange, presenting exhibitions that challenge conventional boundaries and explore new perspectives in contemporary art. We believe in the transformative power of art to inspire, provoke, and connect communities.',
          'Through carefully curated exhibitions, artist collaborations, and public programs, we strive to make contemporary art accessible to diverse audiences and support the careers of visionary artists who are shaping the future of art.',
        ],
      },
    },
    philosophy: {
      title: {
        ko: '우리의 철학',
        en: 'Our Philosophy',
      },
      content: {
        ko: '우리는 예술이 문화적, 지리적 경계를 초월하여 서로 다른 배경을 가진 사람들을 연결하는 보편적 언어 역할을 한다고 믿습니다. 우리의 접근 방식은 진정성, 혁신, 그리고 예술적 진실성에 대한 깊은 존중에 뿌리를 두고 있습니다. 우리는 뛰어난 장인 정신을 보여줄 뿐만 아니라 우리 시대의 긴급한 사회적, 문화적, 환경적 문제에 참여하는 작품을 선보이는 데 전념합니다.',
        en: 'We believe that art serves as a universal language that transcends cultural and geographical boundaries, connecting people from different backgrounds. Our approach is rooted in authenticity, innovation, and a deep respect for artistic integrity. We are committed to presenting works that not only demonstrate exceptional craftsmanship but also engage with the urgent social, cultural, and environmental issues of our time.',
      },
    },
    vision: {
      title: {
        ko: '우리의 비전',
        en: 'Our Vision',
      },
      content: {
        ko: '우리의 비전은 관훈아르테를 아시아 현대 미술계의 중요한 문화 허브로 확립하는 것입니다. 우리는 예술적 우수성에 대한 헌신과 획기적인 작가들의 경력을 발전시키는 역할로 국제적으로 인정받기를 열망합니다. 전 세계 박물관, 갤러리, 컬렉터들과의 전략적 파트너십을 통해 우리가 대표하는 작가들의 글로벌 영향력과 임팩트를 확장하고자 합니다.',
        en: 'Our vision is to establish KWANHOONARTE as a vital cultural hub within the contemporary art scene in Asia. We aspire to be recognized internationally for our commitment to artistic excellence and our role in advancing the careers of groundbreaking artists. Through strategic partnerships with museums, galleries, and collectors worldwide, we aim to expand the global reach and impact of the artists we represent.',
      },
    },
    spaces: {
      title: {
        ko: '우리의 공간',
        en: 'Our Spaces',
      },
      captions: {
        mainHall: {
          ko: '메인 전시홀',
          en: 'Main Exhibition Hall',
        },
        projectSpace: {
          ko: '프로젝트 공간',
          en: 'Project Space',
        },
        viewingRoom: {
          ko: '뷰잉룸',
          en: 'Viewing Room',
        },
      },
    },
  },
  contact: {
    header: {
      title: {
        ko: 'CONTACT',
        en: 'CONTACT',
      },
    },
    visitInfo: {
      title: {
        ko: '방문 안내',
        en: 'Visit Information',
      },
      address: {
        label: { ko: '주소', en: 'Address' },
      },
      phone: {
        label: { ko: '전화', en: 'Phone' },
      },
      email: {
        label: { ko: '이메일', en: 'Email' },
      },
      hours: {
        label: { ko: '운영 시간', en: 'Hours' },
        weekdays: { ko: '월 - 금: 오전 11시 - 오후 7시', en: 'Mon - Fri: 11am - 7pm' },
        weekends: { ko: '토 - 일: 오후 1시 - 오후 6시', en: 'Sat - Sun: 1pm - 6pm' },
      },
    },
    form: {
      title: {
        ko: '문의하기',
        en: 'Inquiry',
      },
      fields: {
        name: { ko: '이름 *', en: 'Name *' },
        email: { ko: '이메일 *', en: 'Email *' },
        phone: { ko: '전화번호', en: 'Phone' },
        subject: { ko: '문의 유형', en: 'Subject' },
        message: { ko: '메시지 *', en: 'Message *' },
      },
      subjects: {
        general: { ko: '일반 문의', en: 'General Inquiry' },
        exhibition: { ko: '전시 정보', en: 'Exhibition Info' },
        artwork: { ko: '작품 구매', en: 'Artwork Purchase' },
        press: { ko: '언론 & 미디어', en: 'Press & Media' },
        other: { ko: '기타', en: 'Other' },
      },
      submit: {
        ko: '메시지 보내기',
        en: 'Send Message',
      },
      submitting: {
        ko: '전송 중...',
        en: 'Sending...',
      },
      success: {
        ko: '메시지가 성공적으로 전송되었습니다. 곧 연락드리겠습니다.',
        en: 'Message sent successfully. We will contact you soon.',
      },
      error: {
        ko: '메시지 전송에 실패했습니다. 다시 시도해주세요.',
        en: 'Failed to send message. Please try again.',
      },
    },
    additional: {
      parking: {
        title: { ko: '주차', en: 'Parking' },
        description: {
          ko: '방문객을 위한 무료 주차가 건물 지하 주차장에서 가능합니다. 갤러리 리셉션에서 주차권을 확인받으시기 바랍니다.',
          en: 'Complimentary parking is available for visitors in the building underground parking. Please validate your parking ticket at the gallery reception.',
        },
      },
      publicTransit: {
        title: { ko: '대중교통', en: 'Public Transit' },
        description: {
          ko: '안국역(3호선) - 6번 출구에서 도보 약 5분 거리입니다.',
          en: 'Anguk Station (Line 3) - Approximately 5 minutes walk from Exit 6.',
        },
      },
      appointments: {
        title: { ko: '예약 관람', en: 'Private Viewing' },
        description: {
          ko: '정규 시간 외 프라이빗 관람 및 예약이 가능합니다. 맞춤형 방문을 준비하시려면 최소 48시간 전에 문의해주세요.',
          en: 'Private viewings and appointments outside regular hours are available. Please contact us at least 48 hours in advance to arrange a personalized visit.',
        },
      },
    },
    social: {
      title: {
        ko: '팔로우하기',
        en: 'Follow Us',
      },
      description: {
        ko: '소셜 미디어에서 관훈아르테를 팔로우하여 최신 업데이트, 비하인드 스토리, 독점 미리보기를 받아보세요.',
        en: 'Follow KWANHOONARTE on social media for the latest updates, behind-the-scenes content, and exclusive previews.',
      },
    },
    newsletter: {
      title: {
        ko: '뉴스레터',
        en: 'Newsletter',
      },
      description: {
        ko: '전시 공지, 미술계 인사이트, 독점 초대를 받아보시려면 구독하세요.',
        en: 'Subscribe to receive exhibition announcements, art world insights, and exclusive invitations.',
      },
      placeholder: {
        ko: '이메일 주소 입력',
        en: 'Enter your email',
      },
      submit: {
        ko: '구독하기',
        en: 'Subscribe',
      },
      privacy: {
        ko: '구독하시면 개인정보 처리방침에 동의하는 것으로 간주됩니다',
        en: 'By subscribing, you agree to our Privacy Policy',
      },
    },
  },
  artists: {
    header: {
      title: {
        ko: 'ARTISTS',
        en: 'ARTISTS',
      },
    },
    filters: {
      all: { ko: '전체', en: 'All' },
      featured: { ko: '대표 작가', en: 'Featured Artists' },
      emerging: { ko: '신진 작가', en: 'Emerging Artists' },
    },
    loadMore: {
      ko: '더 보기',
      en: 'Load More',
    },
  },
  exhibition: {
    header: {
      title: {
        ko: 'EXHIBITIONS',
        en: 'EXHIBITIONS',
      },
    },
    tabs: {
      current: { ko: '현재 전시', en: 'Current' },
      upcoming: { ko: '예정 전시', en: 'Upcoming' },
      past: { ko: '지난 전시', en: 'Past' },
    },
    featured: {
      ko: 'FEATURED',
      en: 'FEATURED',
    },
    viewDetails: {
      ko: '전시 상세보기',
      en: 'View Details',
    },
    archive: {
      title: {
        ko: '전시 아카이브',
        en: 'Exhibition Archive',
      },
      description: {
        ko: '설립 이래 우리의 완전한 전시 역사를 탐험해보세요. 각 전시는 획기적인 현대 미술을 선보이려는 우리의 헌신을 대표합니다.',
        en: 'Explore our complete exhibition history since our founding. Each show represents our commitment to presenting groundbreaking contemporary art.',
      },
      viewAll: {
        ko: '전체 아카이브 보기',
        en: 'View Full Archive',
      },
    },
    empty: {
      ko: '현재 {tab}가 없습니다.',
      en: 'No {tab} exhibitions at this time.',
    },
  },
  fairs: {
    header: {
      title: {
        ko: 'ART FAIRS',
        en: 'ART FAIRS',
      },
    },
    upcoming: {
      title: {
        ko: '예정된 페어',
        en: 'Upcoming Fairs',
      },
    },
    past: {
      title: {
        ko: '지난 참여',
        en: 'Past Participations',
      },
    },
    fields: {
      date: { ko: '날짜', en: 'Date' },
      location: { ko: '장소', en: 'Location' },
      booth: { ko: '부스', en: 'Booth' },
    },
    moreInfo: {
      ko: '상세 정보 →',
      en: 'More Info →',
    },
    empty: {
      ko: '현재 예정된 아트페어가 없습니다.',
      en: 'No upcoming art fairs at this time.',
    },
  },
  news: {
    header: {
      title: {
        ko: 'NEWS',
        en: 'NEWS',
      },
    },
    categories: {
      exhibition: { ko: '전시', en: 'Exhibition' },
      artist: { ko: '작가', en: 'Artist' },
      award: { ko: '수상', en: 'Award' },
      press: { ko: '언론', en: 'Press' },
      general: { ko: '일반', en: 'General' },
    },
    readMore: {
      ko: '자세히 보기 →',
      en: 'Read More →',
    },
  },
} as const
