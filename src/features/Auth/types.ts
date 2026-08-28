export interface User {
  id: number
  name: string | null
  username: string | null
  email: string | null
  password: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface UserFormValues {
  name?: string | null
  username?: string | null
  email?: string | null
  password?: string | null
  is_active?: boolean | null
}
