export interface MorseFallScaleAssessment {
  id: number
  visit_id: number | null
  assessed_by: number | null
  created_by?: number | null
  history_of_falling: string | null
  secondary_diagnosis: string | null
  ambulatory_aid: string | null
  iv_therapy: string | null
  gait: string | null
  mental_status: string | null
  total_score: number | null
  risk_level: string | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface MorseFallScaleAssessmentFormValues {
  visit_id?: number | null
  assessed_by?: number | null
  created_by?: number | null
  history_of_falling?: string | null
  secondary_diagnosis?: string | null
  ambulatory_aid?: string | null
  iv_therapy?: string | null
  gait?: string | null
  mental_status?: string | null
  total_score?: number | null
  risk_level?: string | null
  assessed_at?: string | null
}
