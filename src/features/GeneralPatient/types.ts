export interface Patient {
  id: number
  medical_record_number?: string | null
  name: string | null
  nickname?: string | null
  title_prefix?: string | null
  title_suffix?: string | null
  birth_place?: string | null
  birth_date?: string | null
  gender_id?: number | null
  religion_id?: number | null
  address?: string | null
  rt?: string | null
  rw?: string | null
  postal_code?: string | null
  village_id?: number | null
  education_id?: number | null
  occupation_id?: number | null
  marital_status_id?: number | null
  blood_type_id?: number | null
  nationality_id?: number | null
  ethnicity_id?: number | null
  language_id?: number | null
  is_unidentified?: boolean | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PatientFormValues {
  medical_record_number?: string | null
  name?: string | null
  nickname?: string | null
  title_prefix?: string | null
  title_suffix?: string | null
  birth_place?: string | null
  birth_date?: string | null
  gender_id?: number | null
  religion_id?: number | null
  address?: string | null
  rt?: string | null
  rw?: string | null
  postal_code?: string | null
  village_id?: number | null
  education_id?: number | null
  occupation_id?: number | null
  marital_status_id?: number | null
  blood_type_id?: number | null
  nationality_id?: number | null
  ethnicity_id?: number | null
  language_id?: number | null
  is_unidentified?: boolean | null
  is_active?: boolean | null
}
