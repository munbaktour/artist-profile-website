import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { dbContactToContact, hasPermission } from '@/types/admin'
import type { DbContact, DbCategory, AdminRole } from '@/types/admin'

interface ContactWithRelations extends DbContact {
  contact_tags?: { tag_id: string }[]
  category?: DbCategory
}

// GET /api/admin/contacts - List contacts with filters and pagination
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Parse query params
    const searchParams = request.nextUrl.searchParams
    const page = parseInt(searchParams.get('page') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const sortBy = searchParams.get('sortBy') || 'created_at'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // New filters
    const categoryId = searchParams.get('categoryId')
    const isVip = searchParams.get('isVip')

    // Legacy filters (for backward compatibility)
    const type = searchParams.get('type')
    const vipTier = searchParams.get('vipTier')

    const search = searchParams.get('search')
    const tagIds = searchParams.get('tagIds')?.split(',').filter(Boolean)

    // Build query - include category relation
    let query = supabase
      .from('contacts')
      .select('*, contact_tags(tag_id), category:categories(*)', { count: 'exact' })

    // Apply new filters
    if (categoryId) {
      query = query.eq('category_id', categoryId)
    }
    if (isVip !== null && isVip !== undefined && isVip !== '') {
      query = query.eq('is_vip', isVip === 'true')
    }

    // Apply legacy filters (for backward compatibility)
    if (type) {
      query = query.eq('type', type)
    }
    if (vipTier) {
      query = query.eq('vip_tier', vipTier)
    }

    // Apply search
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,company.ilike.%${search}%`)
    }

    // Apply sorting
    query = query.order(sortBy, { ascending: sortOrder === 'asc' })

    // Apply pagination
    const from = (page - 1) * pageSize
    const to = from + pageSize - 1
    query = query.range(from, to)

    const { data, count, error } = await query

    if (error) {
      console.error('Error fetching contacts:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Filter by tags if needed (post-query filter for simplicity)
    let filteredData: ContactWithRelations[] = (data || []) as ContactWithRelations[]
    if (tagIds && tagIds.length > 0) {
      filteredData = filteredData.filter((contact: ContactWithRelations) => {
        const contactTagIds = contact.contact_tags?.map((ct: { tag_id: string }) => ct.tag_id) || []
        return tagIds.some(tagId => contactTagIds.includes(tagId))
      })
    }

    // Convert to camelCase
    const contacts = filteredData.map(dbContactToContact)

    return NextResponse.json({
      data: contacts,
      total: count || 0,
      page,
      pageSize,
      totalPages: Math.ceil((count || 0) / pageSize),
    })
  } catch (error) {
    console.error('Error in GET /api/admin/contacts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST /api/admin/contacts - Create a new contact
export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user profile for role check
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || !hasPermission(profile.role as AdminRole, 'contacts', 'create')) {
      return NextResponse.json({ error: 'Forbidden: Insufficient permissions' }, { status: 403 })
    }

    const body = await request.json()
    const { tagIds, notes, ...contactData } = body

    // Convert camelCase to snake_case for database
    const dbData: Record<string, unknown> = {
      name: contactData.name,
      name_en: contactData.nameEn || null,
      email: contactData.email || null,
      phone: contactData.phone || null,
      mobile: contactData.mobile || null,
      company: contactData.company || null,
      position: contactData.position || null,
      address: contactData.address || null,
      city: contactData.city || null,
      country: contactData.country || null,
      postal_code: contactData.postalCode || null,
      preferred_language: contactData.preferredLanguage || 'ko',
      newsletter_subscribed: contactData.newsletterSubscribed || false,
      source: contactData.source || null,
      created_by: user.id,
      // New fields
      category_id: contactData.categoryId || null,
      is_vip: contactData.isVip || false,
      // Legacy fields (for backward compatibility)
      type: contactData.type || null,
      vip_tier: contactData.vipTier || null,
    }

    // Insert contact
    const { data: contact, error: insertError } = await supabase
      .from('contacts')
      .insert(dbData)
      .select('*, category:categories(*)')
      .single()

    if (insertError) {
      console.error('Error creating contact:', insertError)
      return NextResponse.json({ error: insertError.message }, { status: 500 })
    }

    // Insert tags if provided
    if (tagIds && tagIds.length > 0) {
      const tagRelations = tagIds.map((tagId: string) => ({
        contact_id: contact.id,
        tag_id: tagId,
      }))

      const { error: tagError } = await supabase
        .from('contact_tags')
        .insert(tagRelations)

      if (tagError) {
        console.error('Error adding tags:', tagError)
      }
    }

    // Insert initial note if provided
    if (notes && notes.trim()) {
      const { error: noteError } = await supabase
        .from('contact_notes')
        .insert({
          contact_id: contact.id,
          content: notes.trim(),
          author_id: user.id,
        })

      if (noteError) {
        console.error('Error adding initial note:', noteError)
      }
    }

    return NextResponse.json({ data: dbContactToContact(contact) }, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/admin/contacts:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
