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
import { cn, formatFileSize } from '@/lib/utils'
import { AdminSkeleton } from '@/components/features/admin/ui'
import type { GalleryDocument } from '@/types/admin'
import { AdminPageHeader } from '@/components/features/admin/ui'
import { ADMIN_TYPE } from '@/components/features/admin/ui'

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
  const [fetchError, setFetchError] = useState<string | null>(null)

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
    setFetchError(null)
    try {
      const params = new URLSearchParams()
      if (searchQuery) params.set('search', searchQuery)
      params.set('page', String(pageNum || 1))
      params.set('pageSize', '20')

      const res = await fetch(`/api/admin/documents?${params}`)
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}))
        throw new Error(errorData.error || `HTTP ${res.status}`)
      }
      const data = await res.json()
      setDocuments(data.data || [])
      setTotal(data.total || 0)
      setTotalPages(data.totalPages || 1)
    } catch (error) {
      console.error('문서 목록 조회 실패:', error)
      setFetchError(error instanceof Error ? error.message : '문서 목록을 불러오는데 실패했습니다.')
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
    <div className="space-y-6">
      <AdminPageHeader
        title="문서 관리"
        subtitle={`총 ${total}개의 문서`}
        actionButton={{
          label: '업로드',
          icon: Upload,
          onClick: () => setShowUploadModal(true),
        }}
      />

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="문서 제목 또는 파일명으로 검색..."
          className="w-full pl-9 pr-4 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-500 placeholder:text-zinc-400"
        />
      </div>

      {/* Document List */}
      <div className="bg-zinc-900 rounded-lg border border-zinc-700 overflow-hidden">
        {loading ? (
          <div className="p-5">
            <AdminSkeleton variant="list-item" count={5} />
          </div>
        ) : fetchError ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-red-500/10 flex items-center justify-center">
              <FolderOpen size={24} className="text-red-400" />
            </div>
            <p className="text-red-400 text-sm font-medium mb-1">오류 발생</p>
            <p className="text-zinc-400 text-xs">{fetchError}</p>
            <button
              onClick={() => fetchDocuments(search, page)}
              className="mt-3 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
            >
              다시 시도
            </button>
          </div>
        ) : documents.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-24 text-center">
            <div className="w-14 h-14 rounded-full bg-zinc-800/60 flex items-center justify-center mb-5">
              <FolderOpen size={24} className="text-zinc-400" />
            </div>
            {search ? (
              <>
                <p className="text-base font-medium text-zinc-100">검색 결과가 없습니다</p>
                <p className="text-sm text-zinc-400 mt-1.5 max-w-sm">
                  다른 제목이나 파일명으로 다시 찾아보세요.
                </p>
              </>
            ) : (
              <>
                <p className="text-base font-medium text-zinc-100">등록된 문서가 없습니다</p>
                <p className="text-sm text-zinc-400 mt-1.5 max-w-sm">
                  전시 도록이나 작품 목록을 올려두면 메일 보낼 때 첨부로 바로 쓸 수 있습니다.
                </p>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#D4AF37] text-zinc-950 rounded-lg font-medium text-sm hover:bg-[#C49B30] transition-colors"
                >
                  <Upload size={16} />
                  첫 문서 업로드
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="divide-y divide-zinc-700">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="p-4 flex items-center gap-4 hover:bg-zinc-800 transition-colors"
              >
                <div className="flex-shrink-0">
                  {getFileIcon(doc.fileType)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-zinc-100 truncate">
                    {doc.title}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-zinc-400 truncate max-w-[200px]">
                      {doc.fileName}
                    </span>
                    <span className="text-xs text-zinc-400">·</span>
                    <span className="text-xs text-zinc-400">
                      {formatFileSize(doc.fileSize)}
                    </span>
                    <span className="text-xs text-zinc-400">·</span>
                    <span className="text-xs text-zinc-400">
                      {formatDate(doc.createdAt)}
                    </span>
                    {doc.uploader && (
                      <>
                        <span className="text-xs text-zinc-400">·</span>
                        <span className="text-xs text-zinc-400">
                          {doc.uploader.fullName || doc.uploader.email}
                        </span>
                      </>
                    )}
                  </div>
                  {doc.description && (
                    <p className="text-xs text-zinc-400 mt-1 truncate">
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
            className="px-3 py-1.5 text-sm text-zinc-400 bg-zinc-900 border border-zinc-700 rounded-md hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            이전
          </button>
          <span className="text-sm text-zinc-400">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => { setPage(page + 1); fetchDocuments(search, page + 1) }}
            disabled={page >= totalPages}
            className="px-3 py-1.5 text-sm text-zinc-400 bg-zinc-900 border border-zinc-700 rounded-md hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed"
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
          <div className="relative w-full max-w-lg mx-4 bg-zinc-900 border border-zinc-700 rounded-xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <h2 className={ADMIN_TYPE.sectionTitle}>문서 업로드</h2>
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
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-500 placeholder:text-zinc-400"
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
                className="w-full px-3 py-2.5 bg-zinc-950 border border-zinc-700 rounded-lg text-zinc-100 text-sm focus:outline-none focus:border-zinc-500 placeholder:text-zinc-400 resize-none"
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
                      <p className="text-xs text-zinc-400">
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
                    <Upload size={24} className="mx-auto text-zinc-500 mb-2" />
                    <p className="text-sm text-zinc-400">
                      파일을 드래그하거나 클릭하여 선택
                    </p>
                    <p className="text-xs text-zinc-400 mt-1">
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
