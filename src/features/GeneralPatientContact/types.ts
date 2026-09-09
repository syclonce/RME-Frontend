export interface PatientContact {
  id: number
  patient_id: number | null
  contact_type: string | null
  contact_value: string | null
  is_primary?: boolean | null
  created_at?: string
  updated_at?: string
  is_active?: boolean | null
}

export interface PatientContactFormValues {
  patient_id?: number | null
  contact_type?: string | null
  contact_value?: string | null
  is_primary?: boolean | null
}
