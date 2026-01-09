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
        // 아직 숨김 기간 중이면 팝업 표시 안 함
        return
      }
    }
    // 약간의 딜레이 후 팝업 표시 (페이지 로드 후 자연스럽게)
    const timer = setTimeout(() => setIsOpen(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
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
  }, [isOpen])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleOverlayClick = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false)
    }
  }, [])

  const handleHideToday = useCallback(() => {
    // 오늘 자정까지 숨기기
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(0, 0, 0, 0)
    localStorage.setItem(POPUP_STORAGE_KEY, tomorrow.toISOString())
    setIsOpen(false)
  }, [])

  const handleViewDetail = useCallback(() => {
    setIsOpen(false)
    router.push('/exhibition')
  }, [router])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-300"
      onClick={handleOverlayClick}
    >
      {/* 배경 오버레이 */}
      <div className="absolute inset-0 bg-black/70" />

      {/* 모달 컨텐츠 */}
      <div className="relative bg-white rounded-lg shadow-2xl w-[90%] max-w-[500px] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* 닫기 버튼 */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-black/70 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* 전시 포스터 이미지 */}
        <div className="relative w-full">
          <Image
            src="/images/popup/현수막.png"
            alt="손문일 개인전"
            width={500}
            height={700}
            className="w-full h-auto"
            priority
          />
        </div>

        {/* 하단 버튼 영역 */}
        <div className="flex border-t border-gray-200">
          <button
            onClick={handleViewDetail}
            className="flex-1 py-4 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors border-r border-gray-200"
          >
            전시 상세보기
          </button>
          <button
            onClick={handleHideToday}
            className="flex-1 py-4 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            오늘 하루 보지 않기
          </button>
        </div>
      </div>
    </div>
  )
}
