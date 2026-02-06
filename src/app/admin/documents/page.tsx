'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import {
  Search,
  Upload,
  Download,
  Trash2,
  FileText,
  Archive,
  X,
  Loader2,
  FolderOpen,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { GalleryDocument } from '@/types/admin'

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<GalleryDocument[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  // Upload modal
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadDescription, setUploadDescription] = useState('')
  const [uploadFile, setUploadFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState('')

  // Delete
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Drag state
  const [isDragging, setIsDragging] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const fetchDocuments = useCallback(async (searchQuery?: string, pageNum?: number) => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.set('search', searchQuery)
      params.set('page', String(pageNum || 1))
      params.set('pageSize', '20')

      const res = await fetch(`/api/admin/documents?${params}`)
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      setDocuments(data.data || [])
      setTotal(data.total || 0)
      setTotalPages(data.totalPages || 1)
    } catch {
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDocuments()
  }, [fetchDocuments])

  const handleSearch = (value: string) => {
    setSearch(value)
    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)
    searchTimeoutRef.current = setTimeout(() => {
      setPage(1)
      fetchDocuments(value, 1)
    }, 300)
  }

  const handleUpload = async () => {
    if (!uploadFile || !uploadTitle.trim()) {
      setUploadError('제목과 파일은 필수입니다.')
      return
    }

    setUploading(true)
    setUploadError('')

    try {
      const formData = new FormData()
      formData.append('file', uploadFile)
      formData.append('title', uploadTitle.trim())
      if (uploadDescription.trim()) {
        formData.append('description', uploadDescription.trim())
      }

      const res = await fetch('/api/admin/documents', {
        method: 'POST',
        body: formData,
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || '업로드 실패')
      }

      setShowUploadModal(false)
      setUploadTitle('')
      setUploadDescription('')
      setUploadFile(null)
      fetchDocuments(search, page)
    } catch (err) {
      setUploadError(err instanceof Error ? err.message : '업로드에 실패했습니다.')
    } finally {
      setUploading(false)
    }
  }

  const handleDownload = async (docId: string) => {
    try {
      const res = await fetch(`/api/admin/documents/${docId}`)
      if (!res.ok) throw new Error('download failed')
      const data = await res.json()
      if (data.url) {
        const a = document.createElement('a')
        a.href = data.url
        a.download = data.fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
      }
    } catch {
      alert('다운로드에 실패했습니다.')
    }
  }

  const handleDelete = async (docId: string) => {
    if (!confirm('이 문서를 삭제하시겠습니까?')) return
    setDeletingId(docId)
    try {
      const res = await fetch(`/api/admin/documents/${docId}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('delete failed')
      fetchDocuments(search, page)
    } catch {
      alert('삭제에 실패했습니다.')
    } finally {
      setDeletingId(null)
    }
  }

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && (file.type === 'application/pdf' || file.type === 'application/zip' || file.type === 'application/x-zip-compressed')) {
      setUploadFile(file)
      setUploadError('')
    } else {
      setUploadError('PDF 또는 ZIP 파일만 업로드할 수 있습니다.')
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setUploadFile(file)
      setUploadError('')
    }
  }

  const getFileIcon = (fileType: string) => {
    if (fileType === 'application/pdf') return <FileText size={20} className="text-red-400" />
    return <Archive size={20} className="text-yellow-400" />
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-zinc-100">문서 관리</h1>
          <p className="text-sm text-zinc-500 mt-1">총 {total}개의 문서</p>
        </div>
        <button
          onClick={() => setShowUploadModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black text-sm font-medium rounded-lg hover:bg-[#C49B30] transition-colors"
        >
          <Upload size={16} />
          업로드
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="문서 제목 또는 파일명으로 검색..."
          className="w-full pl-9 pr-4 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600 placeholder:text-zinc-600"
        />
      </div>

      {/* Document List */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-800 overflow-hidden">
        {loading ? (
          <div className="p-12 flex items-center justify-center">
            <Loader2 size={24} className="animate-spin text-zinc-500" />
          </div>
        ) : documents.length === 0 ? (
          <div className="p-12 text-center">
            <FolderOpen size={40} className="mx-auto text-zinc-600 mb-3" />
            <p className="text-zinc-400 text-sm">
              {search ? '검색 결과가 없습니다.' : '등록된 문서가 없습니다.'}
            </p>
            {!search && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="mt-3 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                첫 문서를 업로드하세요
              </button>
            )}
          </div>
        ) : (
          <div className="divide-y divide-zinc-800">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 flex items-center gap-4 hover:bg-zinc-800/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {getFileIcon(doc.fileType)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-100 truncate">
                    {doc.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-zinc-500 truncate max-w-[200px]">
                      {doc.fileName}
                    </span>
                    <span className="text-xs text-zinc-600">·</span>
                    <span className="text-xs text-zinc-500">
                      {formatFileSize(doc.fileSize)}
                    </span>
                    <span className="text-xs text-zinc-600">·</span>
                    <span className="text-xs text-zinc-500">
                      {formatDate(doc.createdAt)}
                    </span>
                    {doc.uploader && (
                      <>
                        <span className="text-xs text-zinc-600">·</span>
                        <span className="text-xs text-zinc-500">
                          {doc.uploader.fullName || doc.uploader.email}
                        </span>
                      </>
                    )}
                  </div>
                  {doc.description && (
                    <p className="text-xs text-zinc-500 mt-1 truncate">
                      {doc.description}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => handleDownload(doc.id)}
                    className="p-2 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-zinc-700 transition-colors"
                    title="다운로드"
                  >
                    <Download size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(doc.id)}
                    disabled={deletingId === doc.id}
                    className="p-2 rounded-md text-zinc-400 hover:text-red-400 hover:bg-zinc-700 transition-colors disabled:opacity-50"
                    title="삭제"
                  >
                    {deletingId === doc.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => { setPage(page - 1); fetchDocuments(search, page - 1) }}
            disabled={page <= 1}
            className="px-3 py-1.5 text-sm text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            이전
          </button>
          <span className="text-sm text-zinc-500">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => { setPage(page + 1); fetchDocuments(search, page + 1) }}
            disabled={page >= totalPages}
            className="px-3 py-1.5 text-sm text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-md hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            다음
          </button>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/60"
            onClick={() => !uploading && setShowUploadModal(false)}
          />
          <div className="relative w-full max-w-lg mx-4 bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-zinc-100">문서 업로드</h2>
              <button
                onClick={() => !uploading && setShowUploadModal(false)}
                className="p-1 text-zinc-400 hover:text-zinc-100 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">제목 *</label>
              <input
                type="text"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                placeholder="문서 제목을 입력하세요"
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600 placeholder:text-zinc-600"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">설명</label>
              <textarea
                value={uploadDescription}
                onChange={(e) => setUploadDescription(e.target.value)}
                placeholder="문서에 대한 간단한 설명 (선택)"
                rows={2}
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-800 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-600 placeholder:text-zinc-600 resize-none"
              />
            </div>

            {/* File Drop Zone */}
            <div>
              <label className="block text-sm text-zinc-400 mb-1.5">파일 *</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
                className={cn(
                  'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
                  isDragging
                    ? 'border-zinc-500 bg-zinc-800/50'
                    : 'border-zinc-700 hover:border-zinc-600'
                )}
              >
                {uploadFile ? (
                  <div className="flex items-center justify-center gap-3">
                    {getFileIcon(uploadFile.type)}
                    <div className="text-left">
                      <p className="text-sm text-zinc-200 truncate max-w-[250px]">
                        {uploadFile.name}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {formatFileSize(uploadFile.size)}
                      </p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); setUploadFile(null) }}
                      className="p-1 text-zinc-400 hover:text-zinc-100"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload size={24} className="mx-auto text-zinc-600 mb-2" />
                    <p className="text-sm text-zinc-400">
                      파일을 드래그하거나 클릭하여 선택
                    </p>
                    <p className="text-xs text-zinc-600 mt-1">
                      PDF, ZIP · 최대 50MB
                    </p>
                  </>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.zip"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Error */}
            {uploadError && (
              <p className="text-sm text-red-400">{uploadError}</p>
            )}

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => !uploading && setShowUploadModal(false)}
                disabled={uploading}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors disabled:opacity-50"
              >
                취소
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading || !uploadFile || !uploadTitle.trim()}
                className="flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-black text-sm font-medium rounded-lg hover:bg-[#C49B30] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {uploading && <Loader2 size={14} className="animate-spin" />}
                {uploading ? '업로드 중...' : '업로드'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
