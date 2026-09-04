export interface Diagnosis {
  id: number
  visit_id: number | null
  diagnosis_code_id: number | null
  is_primary?: boolean | null
  recorded_at?: string | null
  created_at?: string
  updated_at?: string
  recorded_by?: number | null
  status?: string | null
}

export interface DiagnosisFormValues {
  visit_id?: number | null
  diagnosis_code_id?: number | null
  is_primary?: boolean | null
  recorded_at?: string | null
}
