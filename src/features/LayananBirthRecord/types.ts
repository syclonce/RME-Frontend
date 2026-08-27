export interface BirthRecord {
  id: number
  visit_id: number | null
  mother_patient_id: number | null
  baby_name?: string | null
  gender_id?: number | null
  birth_date: string | null
  birth_weight_grams?: number | null
  birth_length_cm?: number | null
  delivery_method: string | null
  attending_doctor_id?: number | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface BirthRecordFormValues {
  visit_id?: number | null
  mother_patient_id?: number | null
  baby_name?: string | null
  gender_id?: number | null
  birth_date?: string | null
  birth_weight_grams?: number | null
  birth_length_cm?: number | null
  delivery_method?: string | null
  attending_doctor_id?: number | null
  notes?: string | null
}
