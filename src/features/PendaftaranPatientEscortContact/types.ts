export interface PatientEscortContact {
  id: number
  patient_escort_id: number | null
  contact_type: string | null
  contact_value: string | null
  is_primary?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PatientEscortContactFormValues {
  patient_escort_id?: number | null
  contact_type?: string | null
  contact_value?: string | null
  is_primary?: boolean | null
}
