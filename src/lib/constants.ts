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
