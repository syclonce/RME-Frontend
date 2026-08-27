export interface ExternalRiskFactor {
  id: number
  visit_id: number | null
  factor_type: string | null
  description?: string | null
  impact_level?: string | null
  recorded_by: number | null
  recorded_at: string | null
  created_at?: string
  updated_at?: string
}

export interface ExternalRiskFactorFormValues {
  visit_id?: number | null
  factor_type?: string | null
  description?: string | null
  impact_level?: string | null
  recorded_by?: number | null
  recorded_at?: string | null
}
