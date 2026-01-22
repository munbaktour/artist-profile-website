'use client'

import { useMemo } from 'react'
import { useAuth } from './useAuth'
import { hasPermission, ROLE_PERMISSIONS } from '@/types/admin'
import type { AdminRole, RolePermissions, PermissionAction } from '@/types/admin'

export interface UsePermissionsReturn {
  // Current user's role
  role: AdminRole | null

  // Permission check functions
  can: (resource: keyof RolePermissions, action: PermissionAction) => boolean
  canRead: (resource: keyof RolePermissions) => boolean
  canCreate: (resource: keyof RolePermissions) => boolean
  canUpdate: (resource: keyof RolePermissions) => boolean
  canDelete: (resource: keyof RolePermissions) => boolean
  canAll: (resource: keyof RolePermissions) => boolean

  // Role check functions
  isSuperAdmin: boolean
  isAdmin: boolean
  isManager: boolean
  isDirector: boolean
  isViewer: boolean
  isAtLeastAdmin: boolean
  isAtLeastManager: boolean

  // Resource-specific permissions
  contacts: {
    canRead: boolean
    canCreate: boolean
    canUpdate: boolean
    canDelete: boolean
    canAll: boolean
  }
  categories: {
    canRead: boolean
    canCreate: boolean
    canUpdate: boolean
    canDelete: boolean
    canAll: boolean
  }
  notifications: {
    canRead: boolean
    canSend: boolean
    canAll: boolean
  }
  users: {
    canRead: boolean
    canCreate: boolean
    canUpdate: boolean
    canDelete: boolean
    canAll: boolean
  }

  // Loading state
  isLoading: boolean
}

/**
 * Custom hook for checking user permissions
 *
 * Usage:
 * ```tsx
 * const { can, contacts, isAdmin } = usePermissions()
 *
 * // Check specific permission
 * if (can('contacts', 'create')) { ... }
 *
 * // Use resource-specific permissions
 * if (contacts.canDelete) { ... }
 *
 * // Check role
 * if (isAtLeastManager) { ... }
 * ```
 */
export function usePermissions(): UsePermissionsReturn {
  const { profile, loading } = useAuth()

  const role = (profile?.role as AdminRole) || null

  const permissions = useMemo(() => {
    // Permission check functions
    const can = (resource: keyof RolePermissions, action: PermissionAction): boolean => {
      if (!role) return false
      return hasPermission(role, resource, action)
    }

    const canRead = (resource: keyof RolePermissions): boolean => can(resource, 'read')
    const canCreate = (resource: keyof RolePermissions): boolean => can(resource, 'create')
    const canUpdate = (resource: keyof RolePermissions): boolean => can(resource, 'update')
    const canDelete = (resource: keyof RolePermissions): boolean => can(resource, 'delete')
    const canAll = (resource: keyof RolePermissions): boolean => can(resource, 'all')

    // Role checks
    const isSuperAdmin = role === 'super_admin'
    const isAdmin = role === 'admin'
    const isManager = role === 'manager'
    const isDirector = role === 'director'
    const isViewer = role === 'viewer'
    const isAtLeastAdmin = isSuperAdmin || isAdmin
    const isAtLeastManager = isAtLeastAdmin || isManager

    // Resource-specific permissions
    const contacts = {
      canRead: canRead('contacts'),
      canCreate: canCreate('contacts'),
      canUpdate: canUpdate('contacts'),
      canDelete: canDelete('contacts'),
      canAll: canAll('contacts'),
    }

    const categories = {
      canRead: canRead('categories'),
      canCreate: canCreate('categories'),
      canUpdate: canUpdate('categories'),
      canDelete: canDelete('categories'),
      canAll: canAll('categories'),
    }

    const notifications = {
      canRead: canRead('notifications'),
      canSend: can('notifications', 'send'),
      canAll: canAll('notifications'),
    }

    const users = {
      canRead: canRead('users'),
      canCreate: canCreate('users'),
      canUpdate: canUpdate('users'),
      canDelete: canDelete('users'),
      canAll: canAll('users'),
    }

    return {
      role,
      can,
      canRead,
      canCreate,
      canUpdate,
      canDelete,
      canAll,
      isSuperAdmin,
      isAdmin,
      isManager,
      isDirector,
      isViewer,
      isAtLeastAdmin,
      isAtLeastManager,
      contacts,
      categories,
      notifications,
      users,
      isLoading: loading,
    }
  }, [role, loading])

  return permissions
}

/**
 * Higher-order component for permission-based rendering
 *
 * Usage:
 * ```tsx
 * <PermissionGate resource="contacts" action="delete">
 *   <DeleteButton />
 * </PermissionGate>
 * ```
 */
export interface PermissionGateProps {
  resource: keyof RolePermissions
  action: PermissionAction
  children: React.ReactNode
  fallback?: React.ReactNode
}

export function PermissionGate({
  resource,
  action,
  children,
  fallback = null,
}: PermissionGateProps): React.ReactNode {
  const { can, isLoading } = usePermissions()

  if (isLoading) {
    return fallback
  }

  if (!can(resource, action)) {
    return fallback
  }

  return children
}

/**
 * Hook for checking if current user can perform action
 * Simpler version for single permission check
 *
 * Usage:
 * ```tsx
 * const canDeleteContacts = useCanPerform('contacts', 'delete')
 * ```
 */
export function useCanPerform(
  resource: keyof RolePermissions,
  action: PermissionAction
): boolean {
  const { can } = usePermissions()
  return can(resource, action)
}
