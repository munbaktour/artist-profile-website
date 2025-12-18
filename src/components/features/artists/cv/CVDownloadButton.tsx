'use client'

import { Download } from 'lucide-react'
import type { Language } from '@/types'

interface CVDownloadButtonProps {
  language: Language
}

const labels = {
  ko: 'PDF 다운로드',
  en: 'Download PDF'
}

const printHint = {
  ko: '"PDF로 저장"을 선택하세요',
  en: 'Select "Save as PDF"'
}

export function CVDownloadButton({ language }: CVDownloadButtonProps) {
  const handlePrint = () => {
    // Show hint before printing
    alert(printHint[language])
    window.print()
  }

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 hover:border-gray-900 hover:bg-gray-900 hover:text-white transition-all"
    >
      <Download className="w-4 h-4" />
      <span className="tracking-wide">{labels[language]}</span>
    </button>
  )
}
