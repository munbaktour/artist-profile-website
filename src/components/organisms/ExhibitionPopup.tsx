'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

const POPUP_SESSION_KEY = 'exhibition-popup-shown'

export default function ExhibitionPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // 세션당 한 번만 표시
    const hasShown = sessionStorage.getItem(POPUP_SESSION_KEY)
    if (hasShown) {
      return
    }
    // 팝업 표시 및 세션에 기록
    sessionStorage.setItem(POPUP_SESSION_KEY, 'true')
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, handleClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Semi-transparent black overlay */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={handleClose}
      />

      {/* White container - centered, moderate size */}
      <div className="relative bg-white rounded-lg shadow-2xl p-6 max-w-[420px] w-full mx-auto">
        {/* Close button - top right */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 w-9 h-9 bg-white hover:bg-gray-100 rounded-full shadow-lg flex items-center justify-center transition-colors z-10"
          aria-label="닫기"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Image - fits nicely */}
        <Image
          src="/images/popup/현수막 1.png"
          alt="전시 안내"
          width={380}
          height={500}
          className="w-full h-auto rounded"
          priority
        />
      </div>
    </div>
  )
}
