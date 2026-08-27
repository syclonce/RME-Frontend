export interface OtherService {
  id: number
  name: string | null
  code?: string | null
  description?: string | null
  unit?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface OtherServiceFormValues {
  name?: string | null
  code?: string | null
  description?: string | null
  unit?: string | null
  is_active?: boolean | null
}
