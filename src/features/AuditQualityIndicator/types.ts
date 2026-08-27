export interface QualityIndicator {
  id: number
  indicator_id: number | null
  period_month: number | null
  period_year: number | null
  numerator: number | null
  denominator: number | null
  recorded_by?: number | null
  created_at?: string
  updated_at?: string
}

export interface QualityIndicatorFormValues {
  indicator_id?: number | null
  period_month?: number | null
  period_year?: number | null
  numerator?: number | null
  denominator?: number | null
  recorded_by?: number | null
}
