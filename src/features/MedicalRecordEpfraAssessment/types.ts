export interface EpfraAssessment {
  id: number
  visit_id: number | null
  assessor_id?: number | null
  criteria_notes?: string | null
  score?: number | null
  risk_level?: string | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface EpfraAssessmentFormValues {
  visit_id?: number | null
  assessor_id?: number | null
  criteria_notes?: string | null
  score?: number | null
  risk_level?: string | null
  assessed_at?: string | null
}
