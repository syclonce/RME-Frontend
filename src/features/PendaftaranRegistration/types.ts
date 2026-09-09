export interface Registration {
  id: number
  registration_number?: string | null
  patient_id: number | null
  registered_at?: string | null
  admission_diagnosis_id?: number | null
  referral_id?: number | null
  package_id?: number | null
  is_emergency?: boolean | null
  has_fall_risk?: boolean | null
  newborn_weight_grams?: number | null
  newborn_length_cm?: number | null
  birth_time?: string | null
  found_location?: string | null
  found_at?: string | null
  satu_sehat_consent?: boolean | null
  status?: string | null
  created_at?: string
  updated_at?: string
  registered_by?: number | null
}

export interface RegistrationFormValues {
  registration_number?: string | null
  patient_id?: number | null
  registered_at?: string | null
  admission_diagnosis_id?: number | null
  referral_id?: number | null
  package_id?: number | null
  is_emergency?: boolean | null
  has_fall_risk?: boolean | null
  newborn_weight_grams?: number | null
  newborn_length_cm?: number | null
  birth_time?: string | null
  found_location?: string | null
  found_at?: string | null
  satu_sehat_consent?: boolean | null
  status?: string | null
}
