export interface QualityIndicator {
  id: number
  code: string
  name: string
  unit_of_measure: string
  target_value?: number | string | null
  category: string
  created_at?: string
  updated_at?: string
}

export interface QualityIndicatorFormValues {
  code?: string
  name?: string
  unit_of_measure?: string
  target_value?: number | null
  category?: string
}

export interface QualityIndicatorRecord {
  id: number
  indicator_id: number
  period_month: number
  period_year: number
  numerator: number | string
  denominator: number | string
  achieved_value?: number | null
  recorded_by?: number | null
  created_at?: string
  updated_at?: string
}
