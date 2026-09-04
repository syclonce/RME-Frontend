export interface PediatricStatus {
  id: number
  patient_id: number | null
  visit_id: number | null
  birth_weight_grams?: number | null
  birth_length_cm?: number | null
  head_circumference_cm?: number | null
  gestational_age_weeks?: number | null
  immunization_status?: string | null
  developmental_milestones?: string | null
  notes?: string | null
  recorded_at?: string | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
}

export interface PediatricStatusFormValues {
  patient_id?: number | null
  visit_id?: number | null
  birth_weight_grams?: number | null
  birth_length_cm?: number | null
  head_circumference_cm?: number | null
  gestational_age_weeks?: number | null
  immunization_status?: string | null
  developmental_milestones?: string | null
  notes?: string | null
  recorded_at?: string | null
}
