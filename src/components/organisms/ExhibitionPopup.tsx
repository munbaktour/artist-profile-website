'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'

const POPUP_STORAGE_KEY = 'exhibition-popup-hidden-until'

export default function ExhibitionPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // localStorage에서 숨김 설정 확인
    const hiddenUntil = localStorage.getItem(POPUP_STORAGE_KEY)
    if (hiddenUntil) {
      const hiddenDate = new Date(hiddenUntil)
      if (hiddenDate > new Date()) {
        // 아직 숨김 기간 중
        return
      }
    }
    // 팝업 표시
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleCloseToday = useCallback(() => {
    // 오늘 자정까지 숨김
    const tomorrow = new Date()
    tomorrow.setHours(24, 0, 0, 0)
    localStorage.setItem(POPUP_STORAGE_KEY, tomorrow.toISOString())
    setIsOpen(false)
  }, [])

  const handleViewDetail = useCallback(() => {
    setIsOpen(false)
    router.push('/exhibition')
  }, [router])

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      // 스크롤 방지
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/70 animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* 팝업 컨텐츠 */}
      <div className="relative bg-white rounded-lg shadow-2xl max-w-[500px] w-[90%] animate-in zoom-in-95 fade-in duration-300">
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors z-10"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 이미지 */}
        <div className="relative w-full">
          <Image
            src="/images/popup/현수막.png"
            alt="손문일 개인전"
            width={500}
            height={700}
            className="w-full h-auto rounded-t-lg"
            priority
          />
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex border-t">
          <button
            onClick={handleViewDetail}
            className="flex-1 py-4 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors border-r"
          >
            전시 상세보기
          </button>
          <button
            onClick={handleCloseToday}
            className="flex-1 py-4 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            오늘 하루 보지 않기
          </button>
        </div>
      </div>
    </div>
  )
}
