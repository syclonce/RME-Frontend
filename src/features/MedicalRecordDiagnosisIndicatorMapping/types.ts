export interface DiagnosisIndicatorMapping {
  id: number
  diagnosis_id: number | null
  indicator_code: string | null
  indicator_name: string | null
  target_score?: string | null
  description?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface DiagnosisIndicatorMappingFormValues {
  diagnosis_id?: number | null
  indicator_code?: string | null
  indicator_name?: string | null
  target_score?: string | null
  description?: string | null
  is_active?: boolean | null
}
