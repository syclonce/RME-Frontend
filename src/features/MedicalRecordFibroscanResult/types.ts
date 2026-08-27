export interface FibroscanResult {
  id: number
  visit_id: number | null
  examination_date: string | null
  liver_stiffness_kpa?: number | null
  cap_score?: number | null
  fibrosis_stage?: string | null
  examined_by: number | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface FibroscanResultFormValues {
  visit_id?: number | null
  examination_date?: string | null
  liver_stiffness_kpa?: number | null
  cap_score?: number | null
  fibrosis_stage?: string | null
  examined_by?: number | null
  notes?: string | null
}
