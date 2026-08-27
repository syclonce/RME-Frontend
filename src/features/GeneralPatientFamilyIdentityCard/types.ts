export interface PatientFamilyIdentityCard {
  id: number
  patient_family_id: number | null
  identity_type: string | null
  identity_number: string | null
  is_active: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PatientFamilyIdentityCardFormValues {
  patient_family_id?: number | null
  identity_type?: string | null
  identity_number?: string | null
  is_active?: boolean | null
}
