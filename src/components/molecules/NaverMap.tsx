'use client'

import { useEffect, useRef, useState } from 'react'

interface NaverMapProps {
  center?: {
    lat: number
    lng: number
  }
  zoom?: number
  className?: string
}

function NaverMapContent({
  center = { lat: 37.5729503, lng: 126.9856214 },
  zoom = 16,
  className = 'w-full h-[400px]',
}: NaverMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    let checkAttempts = 0
    const maxAttempts = 50 // 5 seconds with 100ms intervals

    // Wait for Naver Maps API to load
    const initMap = () => {
      if (!isMounted) return

      if (!window.naver || !window.naver.maps) {
        console.warn('네이버 지도 API가 아직 로드되지 않았습니다.')
        return false
      }

      if (!mapRef.current) {
        console.warn('맵 컨테이너가 준비되지 않았습니다.')
        return false
      }

      try {
        const naver = window.naver
        const maps = naver.maps

        // Create map
        const mapOptions = {
          center: new maps.LatLng(center.lat, center.lng),
          zoom: zoom,
          minZoom: 10,
          maxZoom: 21,
          zoomControl: true,
          zoomControlOptions: {
            position: maps.Position?.TOP_RIGHT || 9,
          },
          mapTypeControl: false,
          scaleControl: true,
          logoControl: false,
          mapDataControl: false,
        }

        const map = new maps.Map(mapRef.current, mapOptions)

        // Add marker
        new maps.Marker({
          position: new maps.LatLng(center.lat, center.lng),
          map: map,
          title: 'KWANHOONARTE',
        })

        if (isMounted) {
          setIsLoaded(true)
          setError(null)
        }
        return true
      } catch (err) {
        console.error('네이버 지도 초기화 실패:', err)
        if (isMounted) {
          setError('지도 초기화에 실패했습니다.')
        }
        return false
      }
    }

    // Try to initialize immediately
    const success = initMap()

    if (!success) {
      // If not successful, keep trying with interval
      const checkInterval = setInterval(() => {
        checkAttempts++

        const initialized = initMap()

        if (initialized) {
          clearInterval(checkInterval)
        } else if (checkAttempts >= maxAttempts) {
          clearInterval(checkInterval)
          if (isMounted && !isLoaded) {
            setError('네이버 지도 API를 불러올 수 없습니다. Client ID를 확인해주세요.')
          }
        }
      }, 100)

      return () => {
        isMounted = false
        clearInterval(checkInterval)
      }
    }

    return () => {
      isMounted = false
    }
  }, [center.lat, center.lng, zoom, isLoaded])

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 border border-gray-300`}>
        <div className="text-center p-6">
          <p className="text-sm text-gray-600 mb-2">{error}</p>
          <p className="text-xs text-gray-500">
            Client ID가 올바르게 설정되었는지 확인해주세요.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
      <div ref={mapRef} className="w-full h-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <p className="text-sm text-gray-600">지도를 불러오는 중...</p>
        </div>
      )}
    </div>
  )
}

export { NaverMapContent as NaverMap }
