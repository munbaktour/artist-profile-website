import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

// GET: 전시 목록 조회 (공개)
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const slug = searchParams.get('slug')

    let query = supabase
      .from('exhibitions')
      .select('*')
      .order('start_date', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    if (slug) {
      query = query.eq('slug', slug)
    }

    const { data: exhibitions, error } = await query

    if (error) {
      console.error('Error fetching exhibitions:', error)
      return NextResponse.json(
        { error: '전시 목록을 불러오는데 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: exhibitions })
  } catch (error) {
    console.error('Error in exhibitions API:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// POST: 전시 등록 (인증 필요)
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
      .insert({
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
      .select()
      .single()

    if (error) {
      console.error('Error creating exhibition:', error)
      if (error.code === '23505') {
        return NextResponse.json(
          { error: '이미 존재하는 slug입니다.' },
          { status: 409 }
        )
      }
      return NextResponse.json(
        { error: '전시 등록에 실패했습니다.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data: exhibition }, { status: 201 })
  } catch (error) {
    console.error('Error in exhibitions API:', error)
    return NextResponse.json(
      { error: '서버 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
