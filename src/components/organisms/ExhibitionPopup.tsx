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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 오버레이 */}
      <div
        className="absolute inset-0 bg-black/70 animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* 팝업 컨텐츠 */}
      <div className="relative bg-white rounded-lg shadow-2xl w-[95%] max-w-[500px] animate-in zoom-in-95 fade-in duration-300">
        {/* 닫기 버튼 (X) */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 w-8 h-8 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors z-10"
          aria-label="닫기"
        >
          <X className="w-5 h-5 text-white" />
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

        {/* 전시 정보 */}
        <div className="px-5 py-4 text-center border-b">
          <h3 className="text-lg font-medium text-gray-900">관훈갤러리 3층</h3>
          <p className="text-sm text-gray-600 mt-1">A Gap for You</p>
        </div>

        {/* 하단 영역: 체크박스 + 닫기 버튼 */}
        <div className="flex items-center justify-between px-5 py-4">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="w-4 h-4 rounded border-gray-300 text-gray-900 focus:ring-gray-500"
            />
            <span className="text-sm text-gray-600">다시 보지 않기</span>
          </label>
          <button
            onClick={handleClose}
            className="px-6 py-2 text-sm font-medium text-gray-900 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  )
}
