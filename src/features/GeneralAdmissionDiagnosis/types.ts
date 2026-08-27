export interface AdmissionDiagnosis {
  id: number
  visit_id: number | null
  diagnosis_code_id: number | null
  diagnosis_text?: string | null
  is_primary?: boolean | null
  diagnosed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface AdmissionDiagnosisFormValues {
  visit_id?: number | null
  diagnosis_code_id?: number | null
  diagnosis_text?: string | null
  is_primary?: boolean | null
  diagnosed_at?: string | null
}
