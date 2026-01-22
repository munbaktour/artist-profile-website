'use client'

import { useRef, useEffect, useCallback, useState } from 'react'

// ============================================
// Types
// ============================================
export interface FetchState<T> {
  data: T | null
  loading: boolean
  error: string | null
}

export interface UseAbortableFetchOptions {
  /** Abort previous request when making a new one */
  cancelPrevious?: boolean
  /** Initial loading state */
  initialLoading?: boolean
}

export interface UseAbortableFetchReturn<T> {
  state: FetchState<T>
  execute: (url: string, options?: RequestInit) => Promise<T | null>
  abort: () => void
  reset: () => void
}

// ============================================
// Hook: useAbortableFetch
// AbortController 자동 관리 및 요청 취소 기능
// ============================================
export function useAbortableFetch<T = unknown>(
  hookOptions: UseAbortableFetchOptions = {}
): UseAbortableFetchReturn<T> {
  const { cancelPrevious = true, initialLoading = false } = hookOptions

  const abortControllerRef = useRef<AbortController | null>(null)
  const isMountedRef = useRef(true)

  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: initialLoading,
    error: null,
  })

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
      abortControllerRef.current?.abort()
    }
  }, [])

  const abort = useCallback(() => {
    abortControllerRef.current?.abort()
    abortControllerRef.current = null
  }, [])

  const reset = useCallback(() => {
    if (isMountedRef.current) {
      setState({ data: null, loading: false, error: null })
    }
  }, [])

  const execute = useCallback(
    async (url: string, options: RequestInit = {}): Promise<T | null> => {
      // Cancel previous request if option enabled
      if (cancelPrevious) {
        abortControllerRef.current?.abort()
      }

      // Create new abort controller
      const controller = new AbortController()
      abortControllerRef.current = controller

      // Set loading state atomically
      if (isMountedRef.current) {
        setState((prev) => ({ ...prev, loading: true, error: null }))
      }

      try {
        const response = await fetch(url, {
          ...options,
          signal: controller.signal,
        })

        // Check if request was aborted or component unmounted
        if (controller.signal.aborted || !isMountedRef.current) {
          return null
        }

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || `HTTP error! status: ${response.status}`)
        }

        // Atomic state update
        if (isMountedRef.current) {
          setState({ data, loading: false, error: null })
        }

        return data
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name === 'AbortError') {
          return null
        }

        const errorMessage = err instanceof Error ? err.message : 'An error occurred'

        if (isMountedRef.current) {
          setState({ data: null, loading: false, error: errorMessage })
        }

        return null
      }
    },
    [cancelPrevious]
  )

  return { state, execute, abort, reset }
}

// ============================================
// Hook: useAsyncAction
// 중복 실행 방지 및 로딩 상태 관리
// ============================================
export interface UseAsyncActionOptions {
  /** Callback on success */
  onSuccess?: () => void
  /** Callback on error */
  onError?: (error: string) => void
}

export interface UseAsyncActionReturn<TArgs extends unknown[], TResult> {
  execute: (...args: TArgs) => Promise<TResult | null>
  loading: boolean
  error: string | null
  reset: () => void
}

export function useAsyncAction<TArgs extends unknown[], TResult = void>(
  action: (...args: TArgs) => Promise<TResult>,
  options: UseAsyncActionOptions = {}
): UseAsyncActionReturn<TArgs, TResult> {
  const isMountedRef = useRef(true)
  const isExecutingRef = useRef(false)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    isMountedRef.current = true
    return () => {
      isMountedRef.current = false
    }
  }, [])

  const execute = useCallback(
    async (...args: TArgs): Promise<TResult | null> => {
      // Prevent double-click / concurrent execution
      if (isExecutingRef.current) {
        return null
      }

      isExecutingRef.current = true

      if (isMountedRef.current) {
        setLoading(true)
        setError(null)
      }

      try {
        const result = await action(...args)

        if (isMountedRef.current) {
          setLoading(false)
          options.onSuccess?.()
        }

        return result
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'An error occurred'

        if (isMountedRef.current) {
          setLoading(false)
          setError(errorMessage)
          options.onError?.(errorMessage)
        }

        return null
      } finally {
        isExecutingRef.current = false
      }
    },
    [action, options]
  )

  const reset = useCallback(() => {
    if (isMountedRef.current) {
      setError(null)
    }
  }, [])

  return { execute, loading, error, reset }
}

// ============================================
// Utility: createAbortableEffect
// useEffect 내에서 AbortController 사용을 위한 헬퍼
// ============================================
export function createAbortController(): {
  controller: AbortController
  signal: AbortSignal
  cleanup: () => void
} {
  const controller = new AbortController()
  return {
    controller,
    signal: controller.signal,
    cleanup: () => controller.abort(),
  }
}

// ============================================
// Utility: isAbortError
// AbortError 체크 헬퍼
// ============================================
export function isAbortError(error: unknown): boolean {
  return error instanceof Error && error.name === 'AbortError'
}
