import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { randomUUID } from 'crypto'

const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

// POST: 이미지 업로드
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const slug = formData.get('slug') as string | null
    const type = formData.get('type') as string | null

    if (!file) {
      return NextResponse.json(
        { error: '파일이 필요합니다.' },
        { status: 400 }
      )
    }

    if (!slug) {
      return NextResponse.json(
        { error: 'slug가 필요합니다.' },
        { status: 400 }
      )
    }

    if (!type || !['poster', 'gallery'].includes(type)) {
      return NextResponse.json(
        { error: 'type은 poster 또는 gallery여야 합니다.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: '파일 크기는 10MB 이하여야 합니다.' },
        { status: 400 }
      )
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'JPEG, PNG, WebP 형식만 지원됩니다.' },
        { status: 400 }
      )
    }

    // 파일 확장자 추출
    const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
    const filename = `${randomUUID()}.${ext}`
    const storagePath = `${slug}/${type}/${filename}`

    // Supabase Storage에 업로드
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError } = await supabase.storage
      .from('exhibitions')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return NextResponse.json(
        { error: '이미지 업로드에 실패했습니다.' },
        { status: 500 }
      )
    }

    // Public URL 생성
    const { data: urlData } = supabase.storage
      .from('exhibitions')
      .getPublicUrl(storagePath)

    return NextResponse.json({
      data: {
        url: urlData.publicUrl,
        path: storagePath,
      }
    })
  } catch (error) {
    console.error('Error in upload API:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE: 이미지 삭제
export async function DELETE(request: NextRequest) {
  try {
    const supabase = await createClient()

    // 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      )
    }

    const { path } = await request.json()

    if (!path) {
      return NextResponse.json(
        { error: '삭제할 파일 경로가 필요합니다.' },
        { status: 400 }
      )
    }

    const { error } = await supabase.storage
      .from('exhibitions')
      .remove([path])

    if (error) {
      console.error('Storage delete error:', error)
      return NextResponse.json(
        { error: '이미지 삭제에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in upload DELETE API:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
