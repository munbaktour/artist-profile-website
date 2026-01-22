// ============================================
// Admin User Types
// ============================================
export type AdminRole = 'super_admin' | 'admin' | 'manager' | 'director' | 'viewer'

export interface AdminProfile {
  id: string
  email: string
  fullName: string | null
  role: AdminRole
  avatarUrl: string | null
  createdAt: string
  updatedAt: string
}

// ============================================
// Role Permissions
// ============================================
export const ROLE_PERMISSIONS = {
  super_admin: {
    contacts: { create: true, read: true, update: true, delete: true },
    categories: { create: true, read: true, update: true, delete: true },
    notifications: { create: true, read: true, send: true },
    users: { create: true, read: true, update: true, delete: true },
    settings: { read: true, update: true },
  },
  admin: {
    contacts: { create: true, read: true, update: true, delete: true },
    categories: { create: true, read: true, update: true, delete: true },
    notifications: { create: true, read: true, send: true },
    users: { create: false, read: true, update: false, delete: false },
    settings: { read: true, update: false },
  },
  manager: {
    contacts: { create: true, read: true, update: true, delete: false },
    categories: { create: false, read: true, update: false, delete: false },
    notifications: { create: true, read: true, send: true },
    users: { create: false, read: false, update: false, delete: false },
    settings: { read: false, update: false },
  },
  director: {
    contacts: { create: false, read: true, update: true, delete: false },
    categories: { create: false, read: true, update: false, delete: false },
    notifications: { create: true, read: true, send: true },
    users: { create: false, read: false, update: false, delete: false },
    settings: { read: false, update: false },
  },
  viewer: {
    contacts: { create: false, read: true, update: false, delete: false },
    categories: { create: false, read: true, update: false, delete: false },
    notifications: { create: false, read: true, send: false },
    users: { create: false, read: false, update: false, delete: false },
    settings: { read: false, update: false },
  },
} as const

export type RolePermissions = typeof ROLE_PERMISSIONS
export type PermissionResource = keyof RolePermissions['super_admin']
export type PermissionAction<R extends PermissionResource> = keyof RolePermissions['super_admin'][R]

// Utility function to check permission
export function hasPermission<R extends PermissionResource>(
  role: AdminRole,
  resource: R,
  action: PermissionAction<R>
): boolean {
  const permissions = ROLE_PERMISSIONS[role]
  if (!permissions) return false
  const resourcePermissions = permissions[resource] as Record<string, boolean>
  return resourcePermissions?.[action as string] ?? false
}

// ============================================
// Category Types (NEW)
// ============================================
export interface Category {
  id: string
  name: string
  nameEn: string | null
  color: string
  icon: string | null
  sortOrder: number
  isSystem: boolean
  createdAt: string
  updatedAt: string
}

export interface CategoryFormData {
  name: string
  nameEn?: string
  color: string
  icon?: string
  sortOrder?: number
}

export interface DbCategory {
  id: string
  name: string
  name_en: string | null
  color: string
  icon: string | null
  sort_order: number
  is_system: boolean
  created_at: string
  updated_at: string
}

// ============================================
// Contact Types (UPDATED)
// ============================================
// Legacy types (for backward compatibility during migration)
export type ContactType = 'collector' | 'artist' | 'gallery' | 'institution' | 'press' | 'other'
export type VipTier = 'platinum' | 'gold' | 'silver' | 'bronze' | 'standard'

export interface Contact {
  id: string

  // Category (NEW - replaces type)
  categoryId: string | null
  category?: Category

  // Legacy field (kept for backward compatibility)
  type?: ContactType

  // Basic Info
  name: string
  nameEn: string | null
  email: string | null
  phone: string | null
  mobile: string | null

  // Organization
  company: string | null
  position: string | null

  // Address
  address: string | null
  city: string | null
  country: string | null
  postalCode: string | null

  // VIP (UPDATED - simple boolean)
  isVip: boolean

  // Legacy field (kept for backward compatibility)
  vipTier?: VipTier | null

  // Preferences
  preferredLanguage: 'ko' | 'en'
  newsletterSubscribed: boolean

  // Metadata
  source: string | null
  createdBy: string | null
  createdAt: string
  updatedAt: string

  // Relations (when joined)
  tags?: Tag[]
  notes?: Note[]
}

export interface AdminContactFormData {
  categoryId?: string
  name: string
  nameEn?: string
  email?: string
  phone?: string
  mobile?: string
  company?: string
  position?: string
  address?: string
  city?: string
  country?: string
  postalCode?: string
  isVip?: boolean
  preferredLanguage: 'ko' | 'en'
  newsletterSubscribed: boolean
  source?: string
  tagIds?: string[]
}

// ============================================
// Tag Types
// ============================================
export type TagCategory = 'interest' | 'acquisition' | 'event' | 'custom'

export interface Tag {
  id: string
  name: string
  color: string
  category: TagCategory | null
  createdAt: string
}

export interface TagFormData {
  name: string
  color: string
  category?: TagCategory
}

// ============================================
// Note Types
// ============================================
export type NoteType = 'note' | 'call' | 'email' | 'meeting' | 'purchase' | 'event'

export interface Note {
  id: string
  contactId: string
  content: string
  type: NoteType
  isPrivate: boolean
  createdBy: string | null
  createdAt: string
  updatedAt: string

  // Relations
  author?: AdminProfile
}

export interface NoteFormData {
  contactId: string
  content: string
  type: NoteType
  isPrivate: boolean
}

// ============================================
// Notification Types (UPDATED)
// ============================================
export type NotificationChannel = 'email' | 'sms'
export type NotificationType = 'exhibition_invite' | 'general_notice'
export type NotificationStatus = 'pending' | 'sent' | 'failed'

// Individual notification log (per recipient)
export interface NotificationLog {
  id: string
  notificationType: NotificationType
  channel: NotificationChannel
  recipientId: string | null
  recipientEmail: string | null
  recipientPhone: string | null
  subject: string | null
  content: string
  status: NotificationStatus
  errorMessage: string | null
  provider: string | null
  providerResponse: Record<string, unknown> | null
  createdBy: string | null
  createdAt: string
  sentAt: string | null

  // Relations
  recipient?: Contact
  author?: AdminProfile
}

// Request to send notification
export interface SendNotificationRequest {
  contactIds: string[]
  channel: NotificationChannel
  notificationType: NotificationType
  subject?: string // Required for email
  content: string
}

// Legacy Notification type (kept for backward compatibility)
export interface Notification {
  id: string
  contactIds: string[]
  type: NotificationChannel
  subject: string | null
  content: string
  templateId: string | null
  status: NotificationStatus | 'sending' | 'partial'
  sentCount: number
  failedCount: number
  scheduledAt: string | null
  sentAt: string | null
  createdBy: string | null
  createdAt: string
  errorDetails: Record<string, unknown> | null
}

export interface NotificationTemplate {
  id: string
  name: string
  notificationType: NotificationType
  channel: NotificationChannel
  subject: string | null
  content: string
  variables: string[]
  isActive: boolean
  createdBy: string | null
  createdAt: string
  updatedAt: string
}

export interface NotificationFormData {
  contactIds: string[]
  channel: NotificationChannel
  notificationType: NotificationType
  subject?: string
  content: string
  templateId?: string
  scheduledAt?: string
}

// ============================================
// Filter & Pagination Types (UPDATED)
// ============================================
export interface ContactFilters {
  categoryId?: string
  isVip?: boolean
  tagIds?: string[]
  search?: string
  newsletterSubscribed?: boolean
  // Legacy
  type?: ContactType
  vipTier?: VipTier
}

export interface PaginationParams {
  page: number
  pageSize: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface AdminPaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// ============================================
// Database Row Types (snake_case for Supabase)
// ============================================
export interface DbProfile {
  id: string
  email: string
  full_name: string | null
  role: AdminRole
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface DbContact {
  id: string
  category_id: string | null
  type?: ContactType // Legacy
  name: string
  name_en: string | null
  email: string | null
  phone: string | null
  mobile: string | null
  company: string | null
  position: string | null
  address: string | null
  city: string | null
  country: string | null
  postal_code: string | null
  is_vip: boolean
  vip_tier?: VipTier | null // Legacy
  preferred_language: 'ko' | 'en'
  newsletter_subscribed: boolean
  source: string | null
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface DbTag {
  id: string
  name: string
  color: string
  category: TagCategory | null
  created_at: string
}

export interface DbNote {
  id: string
  contact_id: string
  content: string
  type: NoteType
  is_private: boolean
  created_by: string | null
  created_at: string
  updated_at: string
}

export interface DbNotificationLog {
  id: string
  notification_type: NotificationType
  channel: NotificationChannel
  recipient_id: string | null
  recipient_email: string | null
  recipient_phone: string | null
  subject: string | null
  content: string
  status: NotificationStatus
  error_message: string | null
  provider: string | null
  provider_response: Record<string, unknown> | null
  created_by: string | null
  created_at: string
  sent_at: string | null
}

// Legacy DbNotification (for existing notifications table)
export interface DbNotification {
  id: string
  contact_ids: string[]
  type: NotificationChannel
  subject: string | null
  content: string
  template_id: string | null
  status: NotificationStatus
  sent_count: number
  failed_count: number
  scheduled_at: string | null
  sent_at: string | null
  created_by: string | null
  created_at: string
  error_details: Record<string, unknown> | null
}

// ============================================
// Utility Functions for Type Conversion
// ============================================
export function dbCategoryToCategory(db: DbCategory): Category {
  return {
    id: db.id,
    name: db.name,
    nameEn: db.name_en,
    color: db.color,
    icon: db.icon,
    sortOrder: db.sort_order,
    isSystem: db.is_system,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
  }
}

export function dbContactToContact(db: DbContact & { category?: DbCategory }): Contact {
  return {
    id: db.id,
    categoryId: db.category_id,
    category: db.category ? dbCategoryToCategory(db.category) : undefined,
    type: db.type,
    name: db.name,
    nameEn: db.name_en,
    email: db.email,
    phone: db.phone,
    mobile: db.mobile,
    company: db.company,
    position: db.position,
    address: db.address,
    city: db.city,
    country: db.country,
    postalCode: db.postal_code,
    isVip: db.is_vip ?? false,
    vipTier: db.vip_tier,
    preferredLanguage: db.preferred_language,
    newsletterSubscribed: db.newsletter_subscribed,
    source: db.source,
    createdBy: db.created_by,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
  }
}

export function dbTagToTag(db: DbTag): Tag {
  return {
    id: db.id,
    name: db.name,
    color: db.color,
    category: db.category,
    createdAt: db.created_at,
  }
}

export function dbNoteToNote(db: DbNote & { author?: DbProfile }): Note {
  return {
    id: db.id,
    contactId: db.contact_id,
    content: db.content,
    type: db.type,
    isPrivate: db.is_private,
    createdBy: db.created_by,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
    author: db.author ? dbProfileToProfile(db.author) : undefined,
  }
}

export function dbProfileToProfile(db: DbProfile): AdminProfile {
  return {
    id: db.id,
    email: db.email,
    fullName: db.full_name,
    role: db.role,
    avatarUrl: db.avatar_url,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
  }
}

export function dbNotificationLogToNotificationLog(
  db: DbNotificationLog & { recipient?: DbContact; author?: DbProfile }
): NotificationLog {
  return {
    id: db.id,
    notificationType: db.notification_type,
    channel: db.channel,
    recipientId: db.recipient_id,
    recipientEmail: db.recipient_email,
    recipientPhone: db.recipient_phone,
    subject: db.subject,
    content: db.content,
    status: db.status,
    errorMessage: db.error_message,
    provider: db.provider,
    providerResponse: db.provider_response,
    createdBy: db.created_by,
    createdAt: db.created_at,
    sentAt: db.sent_at,
    recipient: db.recipient ? dbContactToContact(db.recipient) : undefined,
    author: db.author ? dbProfileToProfile(db.author) : undefined,
  }
}
