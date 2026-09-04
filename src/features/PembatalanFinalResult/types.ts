export interface PembatalanFinalResult {
  id: number
  visit_id: number | null
  reason: string | null
  cancellation_date: string | null
  requested_by: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
  cancellation_number?: string | null
}

export interface PembatalanFinalResultFormValues {
  visit_id?: number | null
  reason?: string | null
  cancellation_date?: string | null
  requested_by?: string | null
  status?: string | null
}
