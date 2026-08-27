export interface MchatAssessmentExamination {
  id: number
  visit_id: number | null
  patient_id: number | null
  total_score?: number | null
  risk_level?: string | null
  responses_json?: string | null
  recommendation?: string | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface MchatAssessmentExaminationFormValues {
  visit_id?: number | null
  patient_id?: number | null
  total_score?: number | null
  risk_level?: string | null
  responses_json?: string | null
  recommendation?: string | null
  assessed_at?: string | null
}
