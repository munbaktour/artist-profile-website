import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { randomUUID } from 'crypto'
import { dbDocumentToDocument } from '@/types/admin'
import type { DbDocument, DbProfile } from '@/types/admin'

const MAX_FILE_SIZE = 50 * 1024 * 1024 // 50MB
const ALLOWED_TYPES = [
  'application/pdf',
  'application/zip',
  'application/x-zip-compressed',
]

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search')
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')

    let query = supabase
      .from('documents')
      .select('*, uploader:profiles!uploaded_by(*)', { count: 'exact' })

    if (search) {
      query = query.or(`title.ilike.%${search}%,file_name.ilike.%${search}%`)
    }

    query = query.order('created_at', { ascending: false })

    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)

    const { data, count, error } = await query

    if (error) {
      console.error('Error fetching documents:', error)
      return NextResponse.json({ error: '문서 목록을 불러오는데 실패했습니다.' }, { status: 500 })
    }

    const documents = (data || []).map((row) =>
      dbDocumentToDocument(row as DbDocument & { uploader?: DbProfile })
    )

    return NextResponse.json({
      data: documents,
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    })
  } catch (error) {
    console.error('Error in GET /api/admin/documents:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const title = formData.get('title') as string | null
    const description = formData.get('description') as string | null

    if (!file || !title) {
      return NextResponse.json(
        { error: '파일과 제목은 필수입니다.' },
        { status: 400 }
      )
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: '파일 크기는 50MB 이하여야 합니다.' },
        { status: 400 }
      )
    }

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: 'PDF, ZIP 형식만 지원됩니다.' },
        { status: 400 }
      )
    }

    const ext = file.name.split('.').pop()?.toLowerCase() || 'pdf'
    const filename = `${randomUUID()}.${ext}`
    const storagePath = `${filename}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError } = await supabase.storage
      .from('documents')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: false,
      })

    if (uploadError) {
      console.error('Storage upload error:', uploadError)
      return NextResponse.json(
        { error: '파일 업로드에 실패했습니다.' },
        { status: 500 }
      )
    }

    const { data: document, error: insertError } = await supabase
      .from('documents')
      .insert({
        title,
        description: description || null,
        file_name: file.name,
        file_path: storagePath,
        file_size: file.size,
        file_type: file.type,
        uploaded_by: user.id,
      })
      .select('*, uploader:profiles!uploaded_by(*)')
      .single()

    if (insertError) {
      await supabase.storage.from('documents').remove([storagePath])
      console.error('DB insert error:', insertError)
      return NextResponse.json(
        { error: '문서 정보 저장에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      data: dbDocumentToDocument(document as DbDocument & { uploader?: DbProfile })
    }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/admin/documents:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
