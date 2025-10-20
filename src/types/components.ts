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

export interface FooterProps extends BaseProps {}

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

export interface ContactFormProps extends BaseProps {
  onSubmit: (data: any) => void
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
