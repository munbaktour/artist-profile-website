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
    const hiddenUntil = localStorage.getItem(POPUP_STORAGE_KEY)
    if (hiddenUntil) {
      const hiddenDate = new Date(hiddenUntil)
      if (hiddenDate > new Date()) {
        return
      }
    }
    setIsOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleCloseToday = useCallback(() => {
    const tomorrow = new Date()
    tomorrow.setHours(24, 0, 0, 0)
    localStorage.setItem(POPUP_STORAGE_KEY, tomorrow.toISOString())
    setIsOpen(false)
  }, [])

  const handleViewDetail = useCallback(() => {
    setIsOpen(false)
    router.push('/exhibition')
  }, [router])

  useEffect(() => {
    const handleEsc = (e) => {
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
      <div className="absolute inset-0 bg-black/70" onClick={handleClose} />
      <div className="relative bg-white rounded-lg shadow-2xl max-w-[500px] w-[90%]">
        <button onClick={handleClose} className="absolute -top-3 -right-3 w-10 h-10 bg-white hover:bg-gray-100 rounded-full shadow-lg flex items-center justify-center transition-colors z-10" aria-label="닫기">
          <X className="w-5 h-5 text-gray-700" />
        </button>
        <div className="relative w-full">
          <Image src="/images/popup/현수막 1.png" alt="손문일 개인전" width={500} height={700} className="w-full h-auto rounded-t-lg" priority />
        </div>
        <div className="flex border-t">
          <button onClick={handleViewDetail} className="flex-1 py-4 text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors border-r">전시 상세보기</button>
          <button onClick={handleCloseToday} className="flex-1 py-4 text-sm text-gray-500 hover:bg-gray-50 transition-colors">오늘 하루 보지 않기</button>
        </div>
      </div>
    </div>
  )
}
