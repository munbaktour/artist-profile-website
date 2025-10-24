'use client'

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
