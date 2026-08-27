export interface PatientFamily {
  id: number
  patient_id: number | null
  name: string | null
  relationship: string | null
  is_active: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PatientFamilyFormValues {
  patient_id?: number | null
  name?: string | null
  relationship?: string | null
  is_active?: boolean | null
}
