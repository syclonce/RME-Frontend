export interface PatientGuardianContact {
  id: number
  patient_guardian_id: number | null
  contact_type: string | null
  contact_value: string | null
  is_primary?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PatientGuardianContactFormValues {
  patient_guardian_id?: number | null
  contact_type?: string | null
  contact_value?: string | null
  is_primary?: boolean | null
}
