/**
 * 프로젝트 전역 타입 정의
 * Single Source of Truth - 모든 타입은 이 파일에만 정의
 */

// ============================================
// 언어 관련 타입
// ============================================
export type Language = 'ko' | 'en'

export interface LocalizedText {
  ko: string
  en: string
}

// ============================================
// Artist 타입
// ============================================
export interface Artist {
  id: string
  name: LocalizedText
  nameEn?: string // 영문명
  nameKo?: string // 한글명
  category: 'featured' | 'emerging'
  bio: LocalizedText
  image: string
  thumbnailImage?: string
  birthYear?: number
  nationality?: string
  location?: string // 현재 거주지
  education?: string[]
  works?: ArtWork[]
}

export interface ArtWork {
  id: string
  artistId: string
  title: LocalizedText
  year: number
  medium: string
  dimensions: string // 예: "100 x 100 cm"
  image: string
  description?: LocalizedText
  price?: number
  available: boolean
}

// ============================================
// Exhibition 타입
// ============================================
export type ExhibitionStatus = 'current' | 'upcoming' | 'past'

export interface Exhibition {
  id: string
  title: LocalizedText
  artist?: Artist
  artistIds?: string[] // 그룹전인 경우
  status: ExhibitionStatus
  startDate: string // ISO 8601 format
  endDate: string
  location?: LocalizedText
  description: LocalizedText
  posterImage: string
  images?: string[]
  pressRelease?: string
}

// ============================================
// Fair 타입
// ============================================
export interface Fair {
  id: string
  name: string
  location: string
  startDate: string
  endDate: string
  booth?: string
  description?: LocalizedText
  image?: string
  link?: string
}

// ============================================
// News 타입
// ============================================
export interface News {
  id: string
  title: LocalizedText
  category: 'exhibition' | 'artist' | 'award' | 'press' | 'general'
  date: string // ISO 8601 format
  thumbnailImage?: string
  content: LocalizedText
  author?: string
  tags?: string[]
  relatedArtistId?: string
  relatedExhibitionId?: string
}

// ============================================
// Contact Form 타입
// ============================================
export interface ContactFormData {
  name: string
  email: string
  phone?: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

// ============================================
// Navigation 타입
// ============================================
export interface NavigationItem {
  href: string
  label: LocalizedText
}

// ============================================
// API Response 타입
// ============================================
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  hasMore: boolean
}

// ============================================
// Filter 타입
// ============================================
export type ArtistFilter = 'all' | 'featured' | 'emerging'

export interface FilterOptions {
  category?: ArtistFilter
  search?: string
  sortBy?: 'name' | 'date' | 'popular'
  order?: 'asc' | 'desc'
}

// ============================================
// Component Props 타입
// ============================================
export interface BaseComponentProps {
  className?: string
  children?: React.ReactNode
}

// ============================================
// About 페이지 타입
// ============================================
export interface AboutSection {
  title: LocalizedText
  content: LocalizedText
  image?: string
}

export interface AboutPageData {
  philosophy: AboutSection
  vision: AboutSection
  contact: {
    address: LocalizedText
    email: string
    phone: string
    hours: LocalizedText
  }
}

// ============================================
// Utility 타입
// ============================================
export type Nullable<T> = T | null
export type Optional<T> = T | undefined
