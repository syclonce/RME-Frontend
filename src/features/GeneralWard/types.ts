export interface Ward {
  id: number
  name: string | null
  type_id?: number | null
  visit_type_id?: number | null
  allows_request?: boolean | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface WardFormValues {
  name?: string | null
  type_id?: number | null
  visit_type_id?: number | null
  allows_request?: boolean | null
  is_active?: boolean | null
}
