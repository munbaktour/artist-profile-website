'use client'

import { useEffect, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Plus, Pencil, Trash2 } from 'lucide-react'
import type { Tag, TagCategory, TagFormData, DbTag } from '@/types/admin'

const tagCategories: { value: TagCategory; label: string }[] = [
  { value: 'interest', label: '관심사' },
  { value: 'acquisition', label: '구매/수집' },
  { value: 'event', label: '이벤트' },
  { value: 'custom', label: '사용자 정의' },
]

const colorOptions = [
  '#ef4444', // red
  '#f97316', // orange
  '#f59e0b', // amber
  '#84cc16', // lime
  '#22c55e', // green
  '#14b8a6', // teal
  '#06b6d4', // cyan
  '#3b82f6', // blue
  '#6366f1', // indigo
  '#8b5cf6', // violet
  '#a855f7', // purple
  '#ec4899', // pink
  '#6b7280', // gray
]

export default function TagsPage() {
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingTag, setEditingTag] = useState<Tag | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState<TagFormData>({
    name: '',
    color: '#6b7280',
    category: undefined,
  })

  const fetchTags = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/admin/tags')
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch tags')
      }

      // Convert snake_case to camelCase
      const convertedTags = data.data.map((t: DbTag) => ({
        id: t.id,
        name: t.name,
        color: t.color,
        category: t.category,
        createdAt: t.created_at,
      }))

      setTags(convertedTags)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchTags()
  }, [fetchTags])

  const handleOpenDialog = (tag?: Tag) => {
    if (tag) {
      setEditingTag(tag)
      setFormData({
        name: tag.name,
        color: tag.color,
        category: tag.category || undefined,
      })
    } else {
      setEditingTag(null)
      setFormData({
        name: '',
        color: '#6b7280',
        category: undefined,
      })
    }
    setIsDialogOpen(true)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const method = editingTag ? 'PUT' : 'POST'
      const body = editingTag
        ? { id: editingTag.id, ...formData }
        : formData

      const res = await fetch('/api/admin/tags', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save tag')
      }

      fetchTags()
      setIsDialogOpen(false)
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('정말로 이 태그를 삭제하시겠습니까?')) return

    try {
      const res = await fetch(`/api/admin/tags?id=${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to delete tag')
      }

      fetchTags()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const inputClassName = cn(
    'bg-zinc-950 border-zinc-800 text-zinc-100',
    'placeholder:text-zinc-500',
    'focus:ring-white/20 focus:border-white/20'
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100">태그</h1>
          <p className="text-zinc-400 text-sm mt-1">
            연락처를 분류하는 태그를 관리합니다.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => handleOpenDialog()}
              className="bg-white text-black hover:bg-white/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              새 태그
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-zinc-900 border-zinc-800">
            <DialogHeader>
              <DialogTitle className="text-zinc-100">
                {editingTag ? '태그 수정' : '새 태그'}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label className="text-[#fafafa]">
                  이름 <span className="text-red-400">*</span>
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="태그 이름"
                  required
                  className={inputClassName}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-[#fafafa]">카테고리</Label>
                <Select
                  value={formData.category || 'none'}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      category: value === 'none' ? undefined : (value as TagCategory),
                    })
                  }
                >
                  <SelectTrigger className={inputClassName}>
                    <SelectValue placeholder="선택 안함" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-900 border-zinc-800">
                    <SelectItem value="none" className="text-zinc-100">
                      선택 안함
                    </SelectItem>
                    {tagCategories.map((cat) => (
                      <SelectItem
                        key={cat.value}
                        value={cat.value}
                        className="text-zinc-100"
                      >
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-[#fafafa]">색상</Label>
                <div className="flex flex-wrap gap-2">
                  {colorOptions.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={cn(
                        'w-8 h-8 rounded-full transition-transform',
                        formData.color === color
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-zinc-900 scale-110'
                          : 'hover:scale-110'
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-[#fafafa]">미리보기</Label>
                <Badge
                  style={{
                    backgroundColor: formData.color + '20',
                    color: formData.color,
                  }}
                  className="border-0"
                >
                  {formData.name || '태그 이름'}
                </Badge>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  className="bg-transparent border-zinc-800 text-zinc-100 hover:bg-zinc-800"
                >
                  취소
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-white text-black hover:bg-white/90"
                >
                  {isSubmitting ? '저장 중...' : '저장'}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Tags Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-20 bg-zinc-900 rounded-lg border border-zinc-800 animate-pulse"
            />
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6">
          <p className="text-red-400">{error}</p>
        </div>
      ) : tags.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-zinc-500">태그가 없습니다.</p>
          <p className="text-zinc-500 text-sm mt-1">
            새 태그를 추가하여 연락처를 분류해보세요.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {tags.map((tag) => (
            <div
              key={tag.id}
              className="bg-zinc-900 rounded-lg border border-zinc-800 p-4 flex items-center justify-between group hover:border-zinc-600 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: tag.color }}
                />
                <div>
                  <p className="text-zinc-100 font-medium">{tag.name}</p>
                  {tag.category && (
                    <p className="text-zinc-500 text-xs">
                      {tagCategories.find((c) => c.value === tag.category)?.label}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleOpenDialog(tag)}
                  className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(tag.id)}
                  className="h-8 w-8 text-zinc-400 hover:text-red-400 hover:bg-red-500/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
