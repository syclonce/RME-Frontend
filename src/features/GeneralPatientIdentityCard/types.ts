export interface PatientIdentityCard {
  id: number
  patient_id: number | null
  identity_card_type_id: number | null
  identity_number: string | null
  address?: string | null
  rt?: string | null
  rw?: string | null
  postal_code?: string | null
  village_id?: number | null
  is_same_as_current_address?: boolean | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PatientIdentityCardFormValues {
  patient_id?: number | null
  identity_card_type_id?: number | null
  identity_number?: string | null
  address?: string | null
  rt?: string | null
  rw?: string | null
  postal_code?: string | null
  village_id?: number | null
  is_same_as_current_address?: boolean | null
  is_active?: boolean | null
}
