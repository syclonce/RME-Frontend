export interface DifferentialDiagnosis {
  id: number
  visit_id: number | null
  diagnosis_code_id?: number | null
  description: string | null
  rank?: number | null
  recorded_by: number | null
  recorded_at: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface DifferentialDiagnosisFormValues {
  visit_id?: number | null
  diagnosis_code_id?: number | null
  description?: string | null
  rank?: number | null
  recorded_by?: number | null
  recorded_at?: string | null
  status?: string | null
}
