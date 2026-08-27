export interface PatientFamilyContact {
  id: number
  patient_family_id: number | null
  contact_type: string | null
  contact_value: string | null
  is_active: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PatientFamilyContactFormValues {
  patient_family_id?: number | null
  contact_type?: string | null
  contact_value?: string | null
  is_active?: boolean | null
}
