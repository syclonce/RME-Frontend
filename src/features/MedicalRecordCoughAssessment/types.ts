export interface CoughAssessment {
  id: number
  visit_id: number | null
  has_cough?: boolean | null
  duration_weeks?: number | null
  cough_type?: string | null
  other_symptoms?: string | null
  is_referred_tb_screening?: boolean | null
  assessed_by: number | null
  assessed_at: string | null
  created_at?: string
  updated_at?: string
}

export interface CoughAssessmentFormValues {
  visit_id?: number | null
  has_cough?: boolean | null
  duration_weeks?: number | null
  cough_type?: string | null
  other_symptoms?: string | null
  is_referred_tb_screening?: boolean | null
  assessed_by?: number | null
  assessed_at?: string | null
}
