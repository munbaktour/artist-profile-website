import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { dbContactToContact, dbTagToTag, dbNoteToNote, hasPermission } from '@/types/admin'
import type { DbTag, DbContact, DbCategory, DbNote, DbProfile, AdminRole } from '@/types/admin'

interface RouteParams {
  params: Promise<{ id: string }>
}

interface ContactTagJoin {
  tag_id: string
  tags: DbTag | null
}

interface NoteWithAuthor extends DbNote {
  profiles?: DbProfile | null
}

// GET /api/admin/contacts/[id] - Get a single contact with tags and notes
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
    const supabase = await createClient()

    // Check auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get contact with category, tags, and notes
    const { data: contact, error: contactError } = await supabase
      .from('contacts')
      .select(`
        *,
        category:categories (*),
        contact_tags (
          tag_id,
          tags (*)
        ),
        notes (
          *,
          profiles:created_by (
            id,
            email,
            full_name,
            role,
            avatar_url,
            created_at,
            updated_at
          )
        )
      `)
      .eq('id', id)
      .single()

    if (contactError) {
      if (contactError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
      }
      console.error('Error fetching contact:', contactError)
      return NextResponse.json({ error: contactError.message }, { status: 500 })
    }

    // Transform tags from junction table
    const tags = contact.contact_tags?.map((ct: ContactTagJoin) => ct.tags).filter(Boolean) || []

    // Transform notes with author info
    const notes = (contact.notes || []).map((note: NoteWithAuthor) => {
      const noteData = dbNoteToNote({
        ...note,
        author: note.profiles || undefined,
      })
      return noteData
    })

    // Build transformed contact
    const transformedContact = dbContactToContact({
      ...contact,
      category: contact.category as DbCategory | undefined,
    })

    return NextResponse.json({
      data: {
        ...transformedContact,
        tags: tags.map(dbTagToTag),
        notes,
      },
    })
  } catch (error) {
    console.error('Error in GET /api/admin/contacts/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// PUT /api/admin/contacts/[id] - Update a contact
export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
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

    if (!profile || !hasPermission(profile.role as AdminRole, 'contacts', 'update')) {
      return NextResponse.json({ error: 'Forbidden: Insufficient permissions' }, { status: 403 })
    }

    const body = await request.json()
    const { tagIds, ...contactData } = body

    // Convert camelCase to snake_case for database
    const dbData: Partial<DbContact> = {
      updated_at: new Date().toISOString(),
    }

    // New fields
    if (contactData.categoryId !== undefined) dbData.category_id = contactData.categoryId || null
    if (contactData.isVip !== undefined) dbData.is_vip = contactData.isVip

    // Legacy fields
    if (contactData.type !== undefined) dbData.type = contactData.type
    if (contactData.vipTier !== undefined) dbData.vip_tier = contactData.vipTier

    // Other fields
    if (contactData.name !== undefined) dbData.name = contactData.name
    if (contactData.nameEn !== undefined) dbData.name_en = contactData.nameEn
    if (contactData.email !== undefined) dbData.email = contactData.email
    if (contactData.phone !== undefined) dbData.phone = contactData.phone
    if (contactData.mobile !== undefined) dbData.mobile = contactData.mobile
    if (contactData.company !== undefined) dbData.company = contactData.company
    if (contactData.position !== undefined) dbData.position = contactData.position
    if (contactData.address !== undefined) dbData.address = contactData.address
    if (contactData.city !== undefined) dbData.city = contactData.city
    if (contactData.country !== undefined) dbData.country = contactData.country
    if (contactData.postalCode !== undefined) dbData.postal_code = contactData.postalCode
    if (contactData.preferredLanguage !== undefined) dbData.preferred_language = contactData.preferredLanguage
    if (contactData.newsletterSubscribed !== undefined) dbData.newsletter_subscribed = contactData.newsletterSubscribed
    if (contactData.source !== undefined) dbData.source = contactData.source

    // Update contact
    const { data: contact, error: updateError } = await supabase
      .from('contacts')
      .update(dbData)
      .eq('id', id)
      .select('*, category:categories(*)')
      .single()

    if (updateError) {
      if (updateError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Contact not found' }, { status: 404 })
      }
      console.error('Error updating contact:', updateError)
      return NextResponse.json({ error: updateError.message }, { status: 500 })
    }

    // Update tags if provided
    if (tagIds !== undefined) {
      // Remove existing tags
      await supabase
        .from('contact_tags')
        .delete()
        .eq('contact_id', id)

      // Add new tags
      if (tagIds.length > 0) {
        const tagRelations = tagIds.map((tagId: string) => ({
          contact_id: id,
          tag_id: tagId,
        }))

        const { error: tagError } = await supabase
          .from('contact_tags')
          .insert(tagRelations)

        if (tagError) {
          console.error('Error updating tags:', tagError)
        }
      }
    }

    return NextResponse.json({ data: dbContactToContact(contact) })
  } catch (error) {
    console.error('Error in PUT /api/admin/contacts/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE /api/admin/contacts/[id] - Delete a contact
export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params
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

    if (!profile || !hasPermission(profile.role as AdminRole, 'contacts', 'delete')) {
      return NextResponse.json({ error: 'Forbidden: Admin access required' }, { status: 403 })
    }

    // Delete contact (cascade will handle contact_tags and notes)
    const { error: deleteError } = await supabase
      .from('contacts')
      .delete()
      .eq('id', id)

    if (deleteError) {
      console.error('Error deleting contact:', deleteError)
      return NextResponse.json({ error: deleteError.message }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error in DELETE /api/admin/contacts/[id]:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
