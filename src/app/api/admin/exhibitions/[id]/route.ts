import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET: 전시 상세 조회 (공개)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    const isUUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)

    const { data: exhibition, error } = await supabase
      .from('exhibitions')
      .select('*')
      .eq(isUUID ? 'id' : 'slug', id)
      .single()

    if (error || !exhibition) {
      return NextResponse.json(
        { error: '전시를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ data: exhibition })
  } catch (error) {
    console.error('Error in exhibition API:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// PUT: 전시 수정 (인증 필요)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const {
      slug,
      title_ko,
      title_en,
      artist_name_ko,
      artist_name_en,
      artist_id,
      status,
      start_date,
      end_date,
      location_ko,
      location_en,
      description_ko,
      description_en,
      poster_image,
      images,
    } = body

    if (!slug || !title_ko || !start_date || !end_date) {
      return NextResponse.json(
        { error: 'slug, 제목(한국어), 시작일, 종료일은 필수입니다.' },
        { status: 400 }
      )
    }

    const { data: exhibition, error } = await supabase
      .from('exhibitions')
      .update({
        slug,
        title_ko,
        title_en: title_en || null,
        artist_name_ko: artist_name_ko || null,
        artist_name_en: artist_name_en || null,
        artist_id: artist_id || null,
        status: status || 'upcoming',
        start_date,
        end_date,
        location_ko: location_ko || '관훈아르떼',
        location_en: location_en || 'KWANHOON ARTE',
        description_ko: description_ko || null,
        description_en: description_en || null,
        poster_image: poster_image || null,
        images: images || [],
      })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating exhibition:', error)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: '이미 존재하는 slug입니다.' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: '전시 수정에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: exhibition })
  } catch (error) {
    console.error('Error in exhibition API:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// DELETE: 전시 삭제 (인증 필요)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // 인증 확인
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json(
        { error: '인증이 필요합니다.' },
        { status: 401 }
      )
    }

    const { error } = await supabase
      .from('exhibitions')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting exhibition:', error)
      return NextResponse.json(
        { error: '전시 삭제에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in exhibition API:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
