'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation'
import { AlertCircle, Loader2 } from 'lucide-react'

interface ExhibitionInfo {
  slug: string
  title_ko: string
  artist_id?: string
  artist_name_ko?: string
}

export default function CheckinPage() {
  const params = useParams()
  const exhibitionId = params.id as string

  const [exhibition, setExhibition] = useState<ExhibitionInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const visitRecorded = useRef(false)

  useEffect(() => {
    const controller = new AbortController()

    fetch(`/api/admin/exhibitions/${exhibitionId}`, { signal: controller.signal })
      .then(res => res.json())
      .then(data => {
        if (data.data) {
          setExhibition(data.data)
        } else {
          setError('전시 정보를 찾을 수 없습니다.')
        }
      })
      .catch((err) => {
        if (err.name !== 'AbortError') {
          setError('전시 정보를 불러오는데 실패했습니다.')
        }
      })
      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [exhibitionId])

  // 전시 정보 로드 후 리다이렉트
  useEffect(() => {
    if (!exhibition || visitRecorded.current) return

    // artist_id가 있으면 익명 방문 기록 후 작가 페이지로 이동
    if (exhibition.artist_id) {
      visitRecorded.current = true

      // 익명 방문 카운트 (비동기, 실패해도 리다이렉트는 진행)
      fetch('/api/checkin/visit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exhibitionId }),
      }).catch(() => {
        // 에러 무시 - 방문 기록 실패해도 작가 페이지로 이동
      })

      // 즉시 작가 페이지로 리다이렉트
      window.location.href = `/artists/${exhibition.artist_id}`
    }
  }, [exhibition, exhibitionId])

  // 로딩 중
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-sm">전시 정보를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  // 에러 발생
  if (error || !exhibition) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">{error || '전시 정보를 찾을 수 없습니다.'}</p>
        </div>
      </div>
    )
  }

  // artist_id가 있으면 리다이렉트 중 표시
  if (exhibition.artist_id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            {exhibition.title_ko}
          </h2>
          <p className="text-gray-500 text-sm">작품 페이지로 이동 중...</p>
        </div>
      </div>
    )
  }

  // artist_id가 없는 전시 (그룹전 등) - 전시 정보 표시
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h1 className="text-sm font-medium text-gray-500 tracking-wider uppercase mb-2">
            KWANHOON ARTE
          </h1>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {exhibition.title_ko}
          </h2>
          {exhibition.artist_name_ko && (
            <p className="text-gray-600 mb-4">
              {exhibition.artist_name_ko}
            </p>
          )}
          <p className="text-sm text-gray-500 mt-6">
            전시 관람을 즐겨주세요!
          </p>
        </div>
      </div>
    </div>
  )
}
