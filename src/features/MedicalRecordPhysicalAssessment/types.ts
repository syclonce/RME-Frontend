export interface PhysicalAssessment {
  id: number
  visit_id: number | null
  mobility_status?: string | null
  adl_status?: string | null
  cognitive_status?: string | null
  nutritional_risk?: string | null
  pain_level?: number | null
  notes?: string | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface PhysicalAssessmentFormValues {
  visit_id?: number | null
  mobility_status?: string | null
  adl_status?: string | null
  cognitive_status?: string | null
  nutritional_risk?: string | null
  pain_level?: number | null
  notes?: string | null
  assessed_at?: string | null
}
