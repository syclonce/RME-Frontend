export interface PatientGuardianIdentityCard {
  id: number
  patient_guardian_id: number | null
  card_type: string | null
  card_number: string | null
  issued_date?: string | null
  address?: string | null
  rt?: string | null
  rw?: string | null
  postal_code?: string | null
  region_code?: string | null
  created_at?: string
  updated_at?: string
}

export interface PatientGuardianIdentityCardFormValues {
  patient_guardian_id?: number | null
  card_type?: string | null
  card_number?: string | null
  issued_date?: string | null
  address?: string | null
  rt?: string | null
  rw?: string | null
  postal_code?: string | null
  region_code?: string | null
}
