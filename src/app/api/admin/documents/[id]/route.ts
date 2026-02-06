import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const { data: document, error } = await supabase
      .from('documents')
      .select('file_path, file_name')
      .eq('id', id)
      .single()

    if (error || !document) {
      return NextResponse.json({ error: '문서를 찾을 수 없습니다.' }, { status: 404 })
    }

    const { data: signedUrlData, error: signError } = await supabase.storage
      .from('documents')
      .createSignedUrl(document.file_path, 60)

    if (signError || !signedUrlData) {
      console.error('Signed URL error:', signError)
      return NextResponse.json(
        { error: '다운로드 URL 생성에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      url: signedUrlData.signedUrl,
      fileName: document.file_name,
    })
  } catch (error) {
    console.error('Error in GET /api/admin/documents/[id]:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: '인증이 필요합니다.' }, { status: 401 })
    }

    const { data: document, error: fetchError } = await supabase
      .from('documents')
      .select('file_path')
      .eq('id', id)
      .single()

    if (fetchError || !document) {
      return NextResponse.json({ error: '문서를 찾을 수 없습니다.' }, { status: 404 })
    }

    await supabase.storage
      .from('documents')
      .remove([document.file_path])

    const { error: deleteError } = await supabase
      .from('documents')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('DB delete error:', deleteError)
      return NextResponse.json({ error: '문서 삭제에 실패했습니다.' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/admin/documents/[id]:', error)
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 })
  }
}
