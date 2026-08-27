export interface PharmacyDiagnosis {
  id: number
  visit_id: number | null
  prescription_id?: number | null
  problem_category: string | null
  description?: string | null
  recommendation?: string | null
  assessed_by: number | null
  assessed_at: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface PharmacyDiagnosisFormValues {
  visit_id?: number | null
  prescription_id?: number | null
  problem_category?: string | null
  description?: string | null
  recommendation?: string | null
  assessed_by?: number | null
  assessed_at?: string | null
  status?: string | null
}
