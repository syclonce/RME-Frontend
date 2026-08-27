export interface VisitCancellation {
  id: number
  visit_id: number | null
  cancelled_at?: string | null
  reason?: string | null
  created_at?: string
  updated_at?: string
}

export interface VisitCancellationFormValues {
  visit_id?: number | null
  cancelled_at?: string | null
  reason?: string | null
}
