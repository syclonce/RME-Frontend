export interface BirthCertificateLetter {
  id: number
  letter_number: string | null
  patient_id: number | null
  mother_patient_id?: number | null
  visit_id: number | null
  doctor_id: number | null
  issue_date: string | null
  child_name?: string | null
  birth_date_time?: string | null
  birth_weight_grams?: number | null
  birth_length_cm?: number | null
  gender?: string | null
  remarks?: string | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
}

export interface BirthCertificateLetterFormValues {
  letter_number?: string | null
  patient_id?: number | null
  mother_patient_id?: number | null
  visit_id?: number | null
  doctor_id?: number | null
  issue_date?: string | null
  child_name?: string | null
  birth_date_time?: string | null
  birth_weight_grams?: number | null
  birth_length_cm?: number | null
  gender?: string | null
  remarks?: string | null
}
