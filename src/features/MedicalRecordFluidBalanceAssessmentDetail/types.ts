export interface FluidBalanceAssessmentDetail {
  id: number
  fluid_balance_assessment_id: number | null
  type: string | null
  category: string | null
  amount_ml: number | null
  recorded_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface FluidBalanceAssessmentDetailFormValues {
  fluid_balance_assessment_id?: number | null
  type?: string | null
  category?: string | null
  amount_ml?: number | null
  recorded_at?: string | null
}
