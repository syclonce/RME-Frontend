export interface GraceRiskScoreAssessment {
  id: number
  visit_id: number | null
  age: number | null
  heart_rate: number | null
  systolic_bp: number | null
  creatinine_mg_dl: number | null
  cardiac_arrest_at_admission: boolean | null
  st_segment_deviation: boolean | null
  elevated_cardiac_enzymes: boolean | null
  killip_class?: number | null
  total_score?: number | null
  risk_category?: string | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface GraceRiskScoreAssessmentFormValues {
  visit_id?: number | null
  age?: number | null
  heart_rate?: number | null
  systolic_bp?: number | null
  creatinine_mg_dl?: number | null
  cardiac_arrest_at_admission?: boolean | null
  st_segment_deviation?: boolean | null
  elevated_cardiac_enzymes?: boolean | null
  killip_class?: number | null
  total_score?: number | null
  risk_category?: string | null
  assessed_at?: string | null
}
