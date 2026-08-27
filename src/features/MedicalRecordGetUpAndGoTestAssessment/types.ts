export interface GetUpAndGoTestAssessment {
  id: number
  visit_id: number | null
  time_seconds: number | null
  assistive_device?: string | null
  fall_risk?: string | null
  notes?: string | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface GetUpAndGoTestAssessmentFormValues {
  visit_id?: number | null
  time_seconds?: number | null
  assistive_device?: string | null
  fall_risk?: string | null
  notes?: string | null
  assessed_at?: string | null
}
