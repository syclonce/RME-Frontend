export interface NursingDiagnosis {
  id: number
  visit_id: number | null
  diagnosis_label: string | null
  related_factors?: string | null
  defining_characteristics?: string | null
  priority?: string | null
  recorded_by: number | null
  recorded_at: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface NursingDiagnosisFormValues {
  visit_id?: number | null
  diagnosis_label?: string | null
  related_factors?: string | null
  defining_characteristics?: string | null
  priority?: string | null
  recorded_by?: number | null
  recorded_at?: string | null
  status?: string | null
}
