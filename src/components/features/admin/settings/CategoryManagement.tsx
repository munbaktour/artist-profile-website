'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Plus,
  MoreHorizontal,
  Pencil,
  Trash2,
  GripVertical,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Category } from '@/types/admin'

// Predefined color palette for categories
const COLOR_PALETTE = [
  '#D4AF37', // Gold
  '#ef4444', // Red
  '#f59e0b', // Amber
  '#22c55e', // Green
  '#3b82f6', // Blue
  '#8b5cf6', // Violet
  '#ec4899', // Pink
  '#6b7280', // Gray
  '#14b8a6', // Teal
  '#f97316', // Orange
]

interface CategoryManagementProps {
  canEdit?: boolean
}

export function CategoryManagement({ canEdit = true }: CategoryManagementProps) {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [saving, setSaving] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    nameEn: '',
    color: '#6b7280',
    icon: '',
  })

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch('/api/admin/categories')
      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to fetch categories')
      }

      setCategories(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const openCreateDialog = () => {
    setEditingCategory(null)
    setFormData({
      name: '',
      nameEn: '',
      color: '#6b7280',
      icon: '',
    })
    setDialogOpen(true)
  }

  const openEditDialog = (category: Category) => {
    setEditingCategory(category)
    setFormData({
      name: category.name,
      nameEn: category.nameEn || '',
      color: category.color,
      icon: category.icon || '',
    })
    setDialogOpen(true)
  }

  const handleSave = async () => {
    if (!formData.name.trim()) {
      alert('카테고리 이름을 입력해주세요.')
      return
    }

    setSaving(true)

    try {
      const url = '/api/admin/categories'
      const method = editingCategory ? 'PUT' : 'POST'
      const body = editingCategory
        ? { id: editingCategory.id, ...formData }
        : formData

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to save category')
      }

      setDialogOpen(false)
      fetchCategories()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (category: Category) => {
    if (category.isSystem) {
      alert('시스템 카테고리는 삭제할 수 없습니다.')
      return
    }

    if (!confirm(`'${category.name}' 카테고리를 삭제하시겠습니까?\n\n이 카테고리에 속한 연락처는 미분류로 변경됩니다.`)) {
      return
    }

    try {
      const res = await fetch('/api/admin/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: category.id }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete category')
      }

      fetchCategories()
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-32 bg-zinc-800" />
          <Skeleton className="h-9 w-28 bg-zinc-800" />
        </div>
        <div className="rounded-lg border border-zinc-800 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-4 border-b border-zinc-800 last:border-b-0">
              <Skeleton className="h-5 w-5 rounded-full bg-zinc-800" />
              <Skeleton className="h-5 w-32 bg-zinc-800" />
              <Skeleton className="h-5 w-24 bg-zinc-800 ml-auto" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 flex items-center gap-3">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-sm text-zinc-400">
          총 {categories.length}개의 카테고리
        </p>
        {canEdit && (
          <Button
            size="sm"
            onClick={openCreateDialog}
            className="bg-white text-black hover:bg-white/90"
          >
            <Plus className="w-4 h-4 mr-2" />
            추가
          </Button>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-zinc-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-400 w-[50px]"></TableHead>
              <TableHead className="text-zinc-400">이름</TableHead>
              <TableHead className="text-zinc-400">영문명</TableHead>
              <TableHead className="text-zinc-400">유형</TableHead>
              {canEdit && (
                <TableHead className="text-zinc-400 w-[50px]"></TableHead>
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.length === 0 ? (
              <TableRow className="border-zinc-800">
                <TableCell colSpan={canEdit ? 5 : 4} className="text-center text-zinc-500 py-8">
                  카테고리가 없습니다.
                </TableCell>
              </TableRow>
            ) : (
              categories.map((category) => (
                <TableRow
                  key={category.id}
                  className="border-zinc-800 hover:bg-zinc-900"
                >
                  <TableCell>
                    <GripVertical className="w-4 h-4 text-zinc-500" />
                  </TableCell>
                  <TableCell className="font-medium text-zinc-100">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: category.color }}
                      />
                      {category.name}
                    </div>
                  </TableCell>
                  <TableCell className="text-zinc-400">
                    {category.nameEn || '-'}
                  </TableCell>
                  <TableCell>
                    {category.isSystem ? (
                      <span className="px-2 py-1 rounded text-xs bg-blue-500/10 text-blue-400">
                        시스템
                      </span>
                    ) : (
                      <span className="px-2 py-1 rounded text-xs bg-zinc-800 text-zinc-400">
                        사용자
                      </span>
                    )}
                  </TableCell>
                  {canEdit && (
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                          >
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="bg-zinc-900 border-zinc-800"
                        >
                          <DropdownMenuItem
                            className="text-zinc-100 hover:bg-zinc-800 cursor-pointer"
                            onClick={() => openEditDialog(category)}
                          >
                            <Pencil className="w-4 h-4 mr-2" />
                            수정
                          </DropdownMenuItem>
                          {!category.isSystem && (
                            <DropdownMenuItem
                              className="text-red-400 hover:bg-zinc-800 cursor-pointer"
                              onClick={() => handleDelete(category)}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              삭제
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? '카테고리 수정' : '새 카테고리'}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Name */}
            <div className="space-y-2">
              <Label className="text-zinc-50">
                이름 <span className="text-red-400">*</span>
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="예: 컬렉터"
                className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
              />
            </div>

            {/* English Name */}
            <div className="space-y-2">
              <Label className="text-zinc-50">영문명</Label>
              <Input
                value={formData.nameEn}
                onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
                placeholder="예: Collector"
                className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
              />
            </div>

            {/* Color */}
            <div className="space-y-2">
              <Label className="text-zinc-50">색상</Label>
              <div className="flex items-center gap-3">
                <div className="flex gap-2 flex-wrap">
                  {COLOR_PALETTE.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, color })}
                      className={cn(
                        'w-8 h-8 rounded-lg border-2 transition-all',
                        formData.color === color
                          ? 'border-white scale-110'
                          : 'border-transparent hover:border-zinc-600'
                      )}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <Input
                  type="color"
                  value={formData.color}
                  onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                  className="w-12 h-8 p-0 border-zinc-800 cursor-pointer"
                />
              </div>
            </div>

            {/* Icon (Emoji) */}
            <div className="space-y-2">
              <Label className="text-zinc-50">아이콘 (이모지)</Label>
              <Input
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="예: 🎨"
                className="bg-zinc-950 border-zinc-800 text-zinc-100 placeholder:text-zinc-500"
                maxLength={4}
              />
            </div>

            {/* Preview */}
            <div className="space-y-2">
              <Label className="text-zinc-50">미리보기</Label>
              <div className="p-4 rounded-lg bg-zinc-950 border border-zinc-800">
                <span
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium"
                  style={{
                    backgroundColor: `${formData.color}20`,
                    color: formData.color,
                    border: `1px solid ${formData.color}40`,
                  }}
                >
                  {formData.icon && <span>{formData.icon}</span>}
                  {formData.name || '카테고리 이름'}
                </span>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDialogOpen(false)}
              className="bg-transparent border-zinc-800 text-zinc-100 hover:bg-zinc-800"
            >
              취소
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving || !formData.name.trim()}
              className="bg-white text-black hover:bg-white/90"
            >
              {saving ? '저장 중...' : editingCategory ? '수정' : '추가'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
