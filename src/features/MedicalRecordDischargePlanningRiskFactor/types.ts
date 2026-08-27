export interface DischargePlanningRiskFactor {
  id: number
  visit_id: number | null
  risk_factor: string | null
  score?: number | null
  assessed_by: number | null
  assessed_at: string | null
  created_at?: string
  updated_at?: string
}

export interface DischargePlanningRiskFactorFormValues {
  visit_id?: number | null
  risk_factor?: string | null
  score?: number | null
  assessed_by?: number | null
  assessed_at?: string | null
}
