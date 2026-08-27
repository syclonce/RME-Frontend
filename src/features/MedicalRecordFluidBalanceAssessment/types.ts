export interface FluidBalanceAssessment {
  id: number
  visit_id: number | null
  shift?: string | null
  assessed_at: string | null
  total_intake_ml?: number | null
  total_output_ml?: number | null
  balance_ml?: number | null
  created_at?: string
  updated_at?: string
}

export interface FluidBalanceAssessmentFormValues {
  visit_id?: number | null
  shift?: string | null
  assessed_at?: string | null
  total_intake_ml?: number | null
  total_output_ml?: number | null
  balance_ml?: number | null
}
