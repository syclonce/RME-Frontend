export interface Package {
  id: number
  code?: string | null
  name: string | null
  price?: number | null
  description?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PackageFormValues {
  code?: string | null
  name?: string | null
  price?: number | null
  description?: string | null
  is_active?: boolean | null
}
