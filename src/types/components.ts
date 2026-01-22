/**
 * 컴포넌트 Props 타입 정의
 * 재사용 가능한 컴포넌트의 Props 인터페이스
 */

import type { Language, LocalizedText, Artist, Exhibition, News } from './index'

// ============================================
// Base Props
// ============================================
export interface BaseProps {
  className?: string
}

export interface ChildrenProps extends BaseProps {
  children: React.ReactNode
}

// ============================================
// Layout Components
// ============================================
export interface HeaderProps extends BaseProps {
  transparent?: boolean
  fixed?: boolean
}

export type FooterProps = BaseProps

export interface NavigationProps extends BaseProps {
  mobile?: boolean
}

// ============================================
// Carousel Components
// ============================================
export interface CarouselProps extends BaseProps {
  images: CarouselImage[]
  autoPlay?: boolean
  interval?: number
  showThumbnails?: boolean
}

export interface CarouselImage {
  id: string
  src: string
  alt: LocalizedText
  title?: LocalizedText
  link?: string
}

// ============================================
// Card Components
// ============================================
export interface ArtistCardProps extends BaseProps {
  artist: Artist
  variant?: 'grid' | 'list'
  onClick?: () => void
}

export interface ExhibitionCardProps extends BaseProps {
  exhibition: Exhibition
  variant?: 'featured' | 'standard'
}

export interface NewsCardProps extends BaseProps {
  news: News
  featured?: boolean
}

// ============================================
// Filter Components
// ============================================
export interface FilterTabsProps extends BaseProps {
  options: FilterOption[]
  activeFilter: string
  onFilterChange: (filter: string) => void
}

export interface FilterOption {
  value: string
  label: LocalizedText
  count?: number
}

// ============================================
// Form Components
// ============================================
export interface FormFieldProps extends BaseProps {
  label: string
  name: string
  type?: 'text' | 'email' | 'tel' | 'textarea'
  placeholder?: string
  required?: boolean
  error?: string
  value: string
  onChange: (value: string) => void
}

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  subject?: string
  message: string
}

export interface ContactFormProps extends BaseProps {
  onSubmit: (data: ContactFormData) => void
  isSubmitting?: boolean
}

// ============================================
// Language Components
// ============================================
export interface LanguageSwitcherProps extends BaseProps {
  currentLanguage: Language
  onLanguageChange: (lang: Language) => void
}

// ============================================
// Button Components
// ============================================
export interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
}

// ============================================
// Image Components
// ============================================
export interface ResponsiveImageProps extends BaseProps {
  src: string
  alt: string
  aspectRatio?: string
  priority?: boolean
  fill?: boolean
  sizes?: string
}

// ============================================
// Grid Components
// ============================================
export interface GridProps extends ChildrenProps {
  columns?: {
    mobile?: number
    tablet?: number
    desktop?: number
  }
  gap?: number
}

// ============================================
// Section Components
// ============================================
export interface SectionProps extends ChildrenProps {
  title?: LocalizedText
  subtitle?: LocalizedText
  centered?: boolean
  fullWidth?: boolean
}

// ============================================
// Modal Components
// ============================================
export interface ModalProps extends ChildrenProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

// ============================================
// Tabs Components
// ============================================
export interface TabsProps extends BaseProps {
  tabs: TabItem[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export interface TabItem {
  id: string
  label: LocalizedText
  content: React.ReactNode
}

// ============================================
// Admin UI Components
// ============================================
import type { LucideIcon } from 'lucide-react'

/**
 * AdminPageHeader - 관리자 페이지 상단 헤더
 * 사용처: contacts/page, contacts/new, notifications/page
 */
export interface AdminPageHeaderProps extends BaseProps {
  /** 페이지 제목 (한글) */
  title: string
  /** 페이지 부제목 (영어, 선택) */
  subtitle?: string
  /** 메인 액션 버튼 설정 */
  actionButton?: {
    label: string
    icon?: LucideIcon
    onClick?: () => void
    href?: string
  }
  /** 추가 액션 영역 (ReactNode) */
  actions?: React.ReactNode
  /** 뒤로가기 링크 */
  backHref?: string
}

/**
 * StatCardsGrid - 통계 카드 그리드
 * 사용처: contacts/page (4개), notifications/page (3개)
 */
export interface StatItem {
  label: string
  value: number | string
  color?: string
  icon?: LucideIcon
}

export interface StatCardsGridProps extends BaseProps {
  stats: StatItem[]
  columns?: 2 | 3 | 4
}

/**
 * AdminFilterTabs - 어드민 필터 탭
 * 사용처: contacts/page (카테고리), notifications/page (채널/상태)
 */
export interface AdminFilterTab {
  id: string
  label: string
  icon?: LucideIcon
  color?: string
}

export interface AdminFilterTabsProps extends BaseProps {
  tabs: AdminFilterTab[]
  activeTab: string
  onTabChange: (tabId: string) => void
  /** 스타일 변형 */
  variant?: 'default' | 'pill'
}

/**
 * FormSection - 폼 섹션 컨테이너
 * 사용처: contacts/new (5개 섹션), contacts/[id]
 */
export interface FormSectionProps extends ChildrenProps {
  title: string
  icon?: LucideIcon
  description?: string
  /** 접기/펴기 지원 */
  collapsible?: boolean
  defaultCollapsed?: boolean
}

/**
 * AdminSkeleton - 로딩 스켈레톤
 * 사용처: contacts/page, notifications/page, compose/page
 */
export interface AdminSkeletonProps extends BaseProps {
  count?: number
  variant: 'card' | 'list-item' | 'stat' | 'table-row'
  columns?: 1 | 2 | 3 | 4
}

/**
 * AdminEmptyState - 빈 상태 표시
 * 사용처: contacts/page, notifications/page, compose/page, tags/page
 */
export interface AdminEmptyStateProps extends BaseProps {
  icon: LucideIcon
  title: string
  description?: string
  action?: {
    label: string
    href?: string
    onClick?: () => void
    icon?: LucideIcon
  }
}

/**
 * AdminPagination - 페이지네이션
 * 사용처: contacts/page, notifications/page
 */
export interface AdminPaginationProps extends BaseProps {
  page: number
  totalPages: number
  total: number
  pageSize: number
  onPageChange: (page: number) => void
}
