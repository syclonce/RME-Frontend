export interface Role {
  id: number
  name: string | null
  permissions?: string[]
  created_at?: string
  updated_at?: string
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
