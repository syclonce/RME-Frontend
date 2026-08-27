export interface RiskFactor {
  id: number
  visit_id: number | null
  risk_category: string | null
  description?: string | null
  risk_level?: string | null
  identified_by: number | null
  identified_at: string | null
  mitigation_plan?: string | null
  created_at?: string
  updated_at?: string
}

export interface RiskFactorFormValues {
  visit_id?: number | null
  risk_category?: string | null
  description?: string | null
  risk_level?: string | null
  identified_by?: number | null
  identified_at?: string | null
  mitigation_plan?: string | null
}
