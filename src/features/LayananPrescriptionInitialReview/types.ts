export interface PrescriptionInitialReview {
  id: number
  prescription_id: number | null
  reviewed_by: number | null
  reviewed_at: string | null
  is_appropriate?: boolean | null
  issues_found?: string | null
  recommendation?: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface PrescriptionInitialReviewFormValues {
  prescription_id?: number | null
  reviewed_by?: number | null
  reviewed_at?: string | null
  is_appropriate?: boolean | null
  issues_found?: string | null
  recommendation?: string | null
  status?: string | null
}
