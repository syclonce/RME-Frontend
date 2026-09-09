export interface PatientGuardian {
  id: number
  registration_id: number | null
  full_name: string | null
  relationship_to_patient: string | null
  identity_number?: string | null
  phone_number?: string | null
  address?: string | null
  occupation?: string | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
  status?: string | null
}

export interface PatientGuardianFormValues {
  registration_id?: number | null
  full_name?: string | null
  relationship_to_patient?: string | null
  identity_number?: string | null
  phone_number?: string | null
  address?: string | null
  occupation?: string | null
}
