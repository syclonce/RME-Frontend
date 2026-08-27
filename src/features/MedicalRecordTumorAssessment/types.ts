export interface TumorAssessment {
  id: number
  visit_id: number | null
  diagnosis_id?: number | null
  assessed_by: number | null
  created_by?: number | null
  tumor_location: string | null
  size_cm?: number | null
  tnm_t?: string | null
  tnm_n?: string | null
  tnm_m?: string | null
  grade?: string | null
  notes?: string | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface TumorAssessmentFormValues {
  visit_id?: number | null
  diagnosis_id?: number | null
  assessed_by?: number | null
  created_by?: number | null
  tumor_location?: string | null
  size_cm?: number | null
  tnm_t?: string | null
  tnm_n?: string | null
  tnm_m?: string | null
  grade?: string | null
  notes?: string | null
  assessed_at?: string | null
}
