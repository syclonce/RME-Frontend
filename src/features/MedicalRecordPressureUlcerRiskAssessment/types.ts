export interface PressureUlcerRiskAssessment {
  id: number
  visit_id: number | null
  sensory_perception?: number | null
  moisture?: number | null
  activity?: number | null
  mobility?: number | null
  nutrition?: number | null
  friction_shear?: number | null
  total_score?: number | null
  risk_level?: string | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface PressureUlcerRiskAssessmentFormValues {
  visit_id?: number | null
  sensory_perception?: number | null
  moisture?: number | null
  activity?: number | null
  mobility?: number | null
  nutrition?: number | null
  friction_shear?: number | null
  total_score?: number | null
  risk_level?: string | null
  assessed_at?: string | null
}
