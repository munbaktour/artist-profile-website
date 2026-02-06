'use client'

import { useState, useRef, useCallback } from 'react'
import { Upload, X, Loader2, AlertCircle } from 'lucide-react'

interface ImageUploaderProps {
  mode: 'single' | 'multiple'
  value: string | string[]
  onChange: (value: string | string[]) => void
  slug: string
  type: 'poster' | 'gallery'
  maxFiles?: number
  label?: string
  hint?: string
}

const SUPABASE_STORAGE_INDICATOR = '.supabase.co/storage/'

function isSupabaseUrl(url: string): boolean {
  return url.includes(SUPABASE_STORAGE_INDICATOR)
}

function extractStoragePath(url: string): string | null {
  const match = url.match(/\/storage\/v1\/object\/public\/exhibitions\/(.+)$/)
  return match ? match[1] : null
}

export function ImageUploader({
  mode,
  value,
  onChange,
  slug,
  type,
  maxFiles = 15,
  label,
  hint,
}: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const urls = mode === 'single'
    ? (value ? [value as string] : [])
    : (value as string[] || [])

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    setError('')

    if (!slug) {
      setError('먼저 URL Slug를 입력해주세요.')
      return
    }

    const fileArray = Array.from(files)

    // 파일 수 제한 (multiple 모드)
    if (mode === 'multiple' && urls.length + fileArray.length > maxFiles) {
      setError(`최대 ${maxFiles}장까지 업로드할 수 있습니다.`)
      return
    }

    // 클라이언트 유효성 검사
    for (const file of fileArray) {
      if (file.size > 10 * 1024 * 1024) {
        setError(`파일 크기는 10MB 이하여야 합니다: ${file.name}`)
        return
      }
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        setError(`JPEG, PNG, WebP 형식만 지원됩니다: ${file.name}`)
        return
      }
    }

    setUploading(true)
    const newUrls: string[] = []

    for (const file of fileArray) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('slug', slug)
      formData.append('type', type)

      try {
        const res = await fetch('/api/admin/exhibitions/upload', {
          method: 'POST',
          body: formData,
        })

        const data = await res.json()
        if (res.ok && data.data?.url) {
          newUrls.push(data.data.url)
        } else {
          setError(data.error || '업로드에 실패했습니다.')
          break
        }
      } catch {
        setError('업로드에 실패했습니다. 다시 시도해주세요.')
        break
      }
    }

    if (newUrls.length > 0) {
      if (mode === 'single') {
        onChange(newUrls[0])
      } else {
        onChange([...urls, ...newUrls])
      }
    }

    setUploading(false)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }, [slug, type, mode, urls, maxFiles, onChange])

  const handleRemove = useCallback(async (urlToRemove: string) => {
    // Supabase Storage URL인 경우 서버에서도 삭제
    if (isSupabaseUrl(urlToRemove)) {
      const path = extractStoragePath(urlToRemove)
      if (path) {
        try {
          await fetch('/api/admin/exhibitions/upload', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ path }),
          })
        } catch {
          // 삭제 실패해도 UI에서는 제거
        }
      }
    }

    if (mode === 'single') {
      onChange('')
    } else {
      onChange(urls.filter(u => u !== urlToRemove))
    }
  }, [mode, urls, onChange])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    if (e.dataTransfer.files.length > 0) {
      if (mode === 'single') {
        handleFiles([e.dataTransfer.files[0]])
      } else {
        handleFiles(e.dataTransfer.files)
      }
    }
  }, [mode, handleFiles])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (mode === 'single') {
        handleFiles([e.target.files[0]])
      } else {
        handleFiles(e.target.files)
      }
    }
  }

  return (
    <div className="space-y-3">
      {label && (
        <label className="block text-sm text-zinc-400">{label}</label>
      )}

      {/* 업로드 영역 */}
      {(mode === 'single' && urls.length === 0) || mode === 'multiple' ? (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`
            relative flex flex-col items-center justify-center gap-2 p-6
            border-2 border-dashed rounded-lg cursor-pointer transition-all
            ${dragOver
              ? 'border-zinc-500 bg-zinc-800/50'
              : 'border-zinc-800 hover:border-zinc-600 bg-zinc-950'
            }
            ${uploading ? 'pointer-events-none opacity-60' : ''}
          `}
        >
          {uploading ? (
            <Loader2 className="w-8 h-8 text-zinc-400 animate-spin" />
          ) : (
            <Upload className="w-8 h-8 text-zinc-500" />
          )}
          <p className="text-sm text-zinc-400">
            {uploading
              ? '업로드 중...'
              : '이미지를 드래그하거나 클릭하여 업로드'
            }
          </p>
          <p className="text-xs text-zinc-500">
            JPEG, PNG, WebP (최대 10MB)
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple={mode === 'multiple'}
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      ) : null}

      {/* 단일 모드 미리보기 */}
      {mode === 'single' && urls.length > 0 && (
        <div className="relative group rounded-lg overflow-hidden border border-zinc-800">
          <img
            src={urls[0]}
            alt="포스터 미리보기"
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={() => handleRemove(urls[0])}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          >
            <X className="w-4 h-4" />
          </button>
          {/* 새 이미지 업로드 버튼 */}
          <button
            type="button"
            onClick={handleClick}
            className="absolute bottom-2 right-2 px-3 py-1.5 rounded-md bg-black/70 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity hover:bg-zinc-700 hover:text-zinc-100"
          >
            변경
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleInputChange}
            className="hidden"
          />
        </div>
      )}

      {/* 복수 모드 미리보기 그리드 */}
      {mode === 'multiple' && urls.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {urls.map((url, idx) => (
            <div
              key={`${url}-${idx}`}
              className="relative group aspect-square rounded-lg overflow-hidden border border-zinc-800"
            >
              <img
                src={url}
                alt={`전시 이미지 ${idx + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemove(url)}
                className="absolute top-1 right-1 p-1 rounded-full bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-0.5">
                <span className="text-[10px] text-white/70">{idx + 1}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 힌트 */}
      {hint && !error && (
        <p className="text-xs text-zinc-500">{hint}</p>
      )}

      {/* 파일 수 표시 (multiple 모드) */}
      {mode === 'multiple' && urls.length > 0 && (
        <p className="text-xs text-zinc-400">
          {urls.length} / {maxFiles}장
        </p>
      )}

      {/* 에러 */}
      {error && (
        <div className="flex items-center gap-1.5 text-red-400">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <p className="text-xs">{error}</p>
        </div>
      )}
    </div>
  )
}
