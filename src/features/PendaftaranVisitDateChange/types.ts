export interface VisitDateChange {
  id: number
  visit_id: number | null
  old_date: string | null
  new_date: string | null
  reason?: string | null
  created_at?: string
  updated_at?: string
}

export interface VisitDateChangeFormValues {
  visit_id?: number | null
  old_date?: string | null
  new_date?: string | null
  reason?: string | null
}
