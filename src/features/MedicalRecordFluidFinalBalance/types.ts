export interface FluidFinalBalance {
  id: number
  visit_id: number | null
  period_date: string | null
  total_intake_ml: number | null
  total_output_ml: number | null
  balance_ml?: number | null
  recorded_by: number | null
  recorded_at: string | null
  created_at?: string
  updated_at?: string
}

export interface FluidFinalBalanceFormValues {
  visit_id?: number | null
  period_date?: string | null
  total_intake_ml?: number | null
  total_output_ml?: number | null
  balance_ml?: number | null
  recorded_by?: number | null
  recorded_at?: string | null
}
