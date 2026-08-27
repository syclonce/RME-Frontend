export interface PatientPortalAccount {
  id: number
  patient_id: number | null
  username: string | null
  email?: string | null
  phone?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PatientPortalAccountFormValues {
  patient_id?: number | null
  username?: string | null
  email?: string | null
  phone?: string | null
  is_active?: boolean | null
}
