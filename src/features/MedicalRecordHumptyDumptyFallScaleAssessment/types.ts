export interface HumptyDumptyFallScaleAssessment {
  id: number
  visit_id: number | null
  assessed_by: number | null
  created_by?: number | null
  age_score: number | null
  gender_score: number | null
  diagnosis_score: number | null
  cognitive_impairment_score: number | null
  environmental_score: number | null
  surgery_sedation_score: number | null
  medication_score: number | null
  total_score: number | null
  risk_level: string | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface HumptyDumptyFallScaleAssessmentFormValues {
  visit_id?: number | null
  assessed_by?: number | null
  created_by?: number | null
  age_score?: number | null
  gender_score?: number | null
  diagnosis_score?: number | null
  cognitive_impairment_score?: number | null
  environmental_score?: number | null
  surgery_sedation_score?: number | null
  medication_score?: number | null
  total_score?: number | null
  risk_level?: string | null
  assessed_at?: string | null
}
