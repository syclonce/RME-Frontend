export interface Implementation {
  id: number
  visit_id: number | null
  order_reference?: string | null
  description?: string | null
  performed_by: number | null
  performed_at: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface ImplementationFormValues {
  visit_id?: number | null
  order_reference?: string | null
  description?: string | null
  performed_by?: number | null
  performed_at?: string | null
  status?: string | null
}
