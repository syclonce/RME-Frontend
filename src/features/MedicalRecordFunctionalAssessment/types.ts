export interface FunctionalAssessment {
  id: number
  visit_id: number | null
  assessment_date: string | null
  mobility_status?: string | null
  adl_score?: number | null
  assistive_device?: string | null
  assessed_by: number | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface FunctionalAssessmentFormValues {
  visit_id?: number | null
  assessment_date?: string | null
  mobility_status?: string | null
  adl_score?: number | null
  assistive_device?: string | null
  assessed_by?: number | null
  notes?: string | null
}
