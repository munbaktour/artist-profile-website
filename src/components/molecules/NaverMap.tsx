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
    // Wait for Naver Maps API to load
    const initMap = () => {
      if (!window.naver || !window.naver.maps) {
        setError('네이버 지도 API를 불러올 수 없습니다.')
        return
      }

      if (!mapRef.current) return

      try {
        // Create map
        const mapOptions = {
          center: new window.naver.maps.LatLng(center.lat, center.lng),
          zoom: zoom,
          minZoom: 10,
          maxZoom: 21,
          zoomControl: true,
          zoomControlOptions: {
            position: window.naver.maps.Position.TOP_RIGHT,
          },
          mapTypeControl: false,
          scaleControl: true,
          logoControl: false,
          mapDataControl: false,
        }

        const map = new window.naver.maps.Map(mapRef.current, mapOptions)

        // Add marker
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(center.lat, center.lng),
          map: map,
          title: 'KWANHOONARTE',
        })

        setIsLoaded(true)
        setError(null)
      } catch (err) {
        console.error('네이버 지도 초기화 실패:', err)
        setError('지도 초기화에 실패했습니다.')
      }
    }

    // Check if script is already loaded
    if (window.naver && window.naver.maps) {
      initMap()
    } else {
      // Wait for script to load
      const checkInterval = setInterval(() => {
        if (window.naver && window.naver.maps) {
          clearInterval(checkInterval)
          initMap()
        }
      }, 100)

      // Timeout after 5 seconds
      const timeout = setTimeout(() => {
        clearInterval(checkInterval)
        if (!window.naver || !window.naver.maps) {
          setError('네이버 지도 로딩 시간 초과')
        }
      }, 5000)

      return () => {
        clearInterval(checkInterval)
        clearTimeout(timeout)
      }
    }
  }, [center.lat, center.lng, zoom])

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
