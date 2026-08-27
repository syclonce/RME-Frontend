export interface Service {
  id: number
  code?: string | null
  name: string | null
  category?: string | null
  type_id?: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface ServiceFormValues {
  code?: string | null
  name?: string | null
  category?: string | null
  type_id?: number | null
  is_active?: boolean | null
}
