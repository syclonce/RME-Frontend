export interface VisitCancellation {
  id: number
  visit_id: number | null
  cancelled_by: number | null
  reason: string | null
  cancelled_at: string | null
  created_at?: string
  updated_at?: string
}

export interface VisitCancellationFormValues {
  visit_id?: number | null
  cancelled_by?: number | null
  reason?: string | null
  cancelled_at?: string | null
}
