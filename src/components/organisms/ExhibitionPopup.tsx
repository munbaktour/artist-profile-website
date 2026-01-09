'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

const POPUP_STORAGE_KEY = 'exhibition-popup-hidden'

export default function ExhibitionPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  useEffect(() => {
    // localStorage에서 "다시 보지 않기" 설정 확인
    const isHidden = localStorage.getItem(POPUP_STORAGE_KEY)
    if (isHidden === 'true') {
      return
    }
    // 팝업 표시
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    // "다시 보지 않기" 체크되었으면 저장
    if (dontShowAgain) {
      localStorage.setItem(POPUP_STORAGE_KEY, 'true')
    }
    setIsOpen(false)
  }, [dontShowAgain])

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
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/70 animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* 팝업 컨텐츠 - 크기 조정 */}
      <div className="relative bg-white rounded-xl shadow-2xl w-[80%] max-w-[500px] max-h-[600px] p-5 md:p-10 animate-in zoom-in-95 fade-in duration-300
        max-md:w-[85%] max-md:max-w-[350px] max-md:p-5">

        {/* 닫기 버튼 (X) */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="닫기"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>

        {/* 이미지 - 최대 높이 제한 */}
        <div className="relative w-full flex justify-center">
          <Image
            src="/images/popup/현수막.png"
            alt="손문일 개인전"
            width={400}
            height={400}
            className="w-full h-auto max-h-[400px] max-md:max-h-[300px] object-contain rounded-lg"
            priority
          />
        </div>

        {/* 전시 정보 */}
        <div className="mt-5 text-center">
          <h3 className="text-base md:text-lg font-medium text-gray-900">관훈갤러리 3층</h3>
          <p className="text-sm text-gray-600 mt-1">A Gap for You</p>
        </div>

        {/* 하단 영역: 체크박스 + 닫기 버튼 */}
        <div className="flex items-center justify-between mt-5 pt-4 border-t">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
            />
            <span className="text-xs md:text-sm text-gray-600">다시 보지 않기</span>
          </label>
          <button
            onClick={handleClose}
            className="px-4 md:px-6 py-2 text-xs md:text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
