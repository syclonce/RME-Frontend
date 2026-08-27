export interface DiagnosisRestriction {
  id: number
  diagnosis_code_id: number | null
  restricted_antibiotic_name: string | null
  requires_justification?: boolean | null
  notes?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface DiagnosisRestrictionFormValues {
  diagnosis_code_id?: number | null
  restricted_antibiotic_name?: string | null
  requires_justification?: boolean | null
  notes?: string | null
  is_active?: boolean | null
}
