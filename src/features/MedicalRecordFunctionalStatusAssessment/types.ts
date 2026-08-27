export interface FunctionalStatusAssessment {
  id: number
  visit_id: number | null
  assessed_by: number | null
  created_by?: number | null
  bathing_status?: string | null
  dressing_status?: string | null
  toileting_status?: string | null
  transferring_status?: string | null
  feeding_status?: string | null
  total_score?: number | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface FunctionalStatusAssessmentFormValues {
  visit_id?: number | null
  assessed_by?: number | null
  created_by?: number | null
  bathing_status?: string | null
  dressing_status?: string | null
  toileting_status?: string | null
  transferring_status?: string | null
  feeding_status?: string | null
  total_score?: number | null
  assessed_at?: string | null
}
