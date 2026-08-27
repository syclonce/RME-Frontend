export interface ChiefComplaint {
  id: number
  visit_id: number | null
  complaint?: string | null
  onset?: string | null
  duration?: string | null
  recorded_by: number | null
  recorded_at: string | null
  created_at?: string
  updated_at?: string
}

export interface ChiefComplaintFormValues {
  visit_id?: number | null
  complaint?: string | null
  onset?: string | null
  duration?: string | null
  recorded_by?: number | null
  recorded_at?: string | null
}
