export interface Role {
  id: number
  name: string | null
  permissions?: string[]
  created_at?: string
  updated_at?: string
  permission_id?: number | null
  method?: string | null
  uri?: string | null
  controller_action?: string | null
  module?: string | null
  legacy_tier?: string | null
  is_public?: boolean | null
}

export interface RoleFormValues {
  name?: string | null
  permissions?: string[]
}

export interface Permission {
  id: number
  name: string | null
  created_at?: string
  updated_at?: string
}

export interface PermissionFormValues {
  name?: string | null
}
