/**
 * API 엔드포인트 및 함수 정의
 * Single Source of Truth - 모든 API 호출은 이 파일을 통해서만
 */

import type {
  Artist,
  Exhibition,
  News,
  Fair,
  ContactFormData,
  ApiResponse,
  PaginatedResponse,
  FilterOptions,
} from '@/types'

// ============================================
// API 엔드포인트
// ============================================
export const API_ENDPOINTS = {
  ARTISTS: '/api/artists',
  ARTIST_BY_ID: (id: string) => `/api/artists/${id}`,
  EXHIBITIONS: '/api/exhibitions',
  EXHIBITION_BY_ID: (id: string) => `/api/exhibitions/${id}`,
  NEWS: '/api/news',
  NEWS_BY_ID: (id: string) => `/api/news/${id}`,
  FAIRS: '/api/fairs',
  CONTACT: '/api/contact',
} as const

// ============================================
// Base Fetch 함수
// ============================================
async function apiFetch<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(endpoint, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.error('API Fetch Error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// ============================================
// Artists API
// ============================================
export async function fetchArtists(
  filters?: FilterOptions
): Promise<ApiResponse<Artist[]>> {
  const queryParams = new URLSearchParams()

  if (filters?.category) queryParams.set('category', filters.category)
  if (filters?.search) queryParams.set('search', filters.search)
  if (filters?.sortBy) queryParams.set('sortBy', filters.sortBy)
  if (filters?.order) queryParams.set('order', filters.order)

  const url = `${API_ENDPOINTS.ARTISTS}?${queryParams.toString()}`
  return apiFetch<Artist[]>(url)
}

export async function fetchArtistById(id: string): Promise<ApiResponse<Artist>> {
  return apiFetch<Artist>(API_ENDPOINTS.ARTIST_BY_ID(id))
}

// ============================================
// Exhibitions API
// ============================================
export async function fetchExhibitions(
  status?: 'current' | 'upcoming' | 'past'
): Promise<ApiResponse<Exhibition[]>> {
  const url = status
    ? `${API_ENDPOINTS.EXHIBITIONS}?status=${status}`
    : API_ENDPOINTS.EXHIBITIONS

  return apiFetch<Exhibition[]>(url)
}

export async function fetchExhibitionById(
  id: string
): Promise<ApiResponse<Exhibition>> {
  return apiFetch<Exhibition>(API_ENDPOINTS.EXHIBITION_BY_ID(id))
}

// ============================================
// News API
// ============================================
export async function fetchNews(
  page = 1,
  pageSize = 10
): Promise<ApiResponse<PaginatedResponse<News>>> {
  const url = `${API_ENDPOINTS.NEWS}?page=${page}&pageSize=${pageSize}`
  return apiFetch<PaginatedResponse<News>>(url)
}

export async function fetchNewsById(id: string): Promise<ApiResponse<News>> {
  return apiFetch<News>(API_ENDPOINTS.NEWS_BY_ID(id))
}

// ============================================
// Fairs API
// ============================================
export async function fetchFairs(): Promise<ApiResponse<Fair[]>> {
  return apiFetch<Fair[]>(API_ENDPOINTS.FAIRS)
}

// ============================================
// Contact Form API
// ============================================
export async function submitContactForm(
  data: ContactFormData
): Promise<ApiResponse<{ message: string }>> {
  return apiFetch<{ message: string }>(API_ENDPOINTS.CONTACT, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// ============================================
// EmailJS 통합 (선택적)
// ============================================
export async function sendEmailViaEmailJS(
  data: ContactFormData
): Promise<boolean> {
  // EmailJS 설정 후 구현
  // emailjs.send(serviceId, templateId, data)
  console.log('EmailJS 전송:', data)
  return true
}
