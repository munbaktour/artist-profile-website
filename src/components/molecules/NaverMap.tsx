'use client'

import { useEffect, useState } from 'react'
import { Container as MapDiv, NaverMap as Map, Marker } from 'react-naver-maps'

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
  const [isLoaded, setIsLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Check if Naver Maps API is loaded
    if (typeof window !== 'undefined') {
      const checkNaverMaps = () => {
        if (window.naver && window.naver.maps) {
          setIsLoaded(true)
          setError(null)
        } else {
          setError('네이버 지도 API를 불러올 수 없습니다.')
        }
      }

      // Check immediately
      checkNaverMaps()

      // Also check after a delay in case it's still loading
      const timer = setTimeout(checkNaverMaps, 2000)

      return () => clearTimeout(timer)
    }
  }, [])

  if (error) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100 border border-gray-300`}>
        <div className="text-center p-6">
          <p className="text-sm text-gray-600 mb-2">{error}</p>
          <p className="text-xs text-gray-500">
            Client ID: {process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID || '설정되지 않음'}
          </p>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className={`${className} flex items-center justify-center bg-gray-100`}>
        <p className="text-sm text-gray-600">지도를 불러오는 중...</p>
      </div>
    )
  }

  return (
    <MapDiv className={className}>
      <Map
        defaultCenter={center}
        defaultZoom={zoom}
        minZoom={10}
        maxZoom={21}
        zoomControl={true}
        zoomControlOptions={{
          position: 9, // TOP_RIGHT
        }}
        mapTypeControl={false}
        scaleControl={true}
        logoControl={false}
        mapDataControl={false}
      >
        <Marker
          position={center}
          title="KWANHOONARTE"
        />
      </Map>
    </MapDiv>
  )
}

export { NaverMapContent as NaverMap }
