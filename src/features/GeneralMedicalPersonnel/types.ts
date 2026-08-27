export interface MedicalPersonnel {
  id: number
  identity_number?: string | null
  name: string | null
  personnel_type: string | null
  profession_id?: number | null
  license_number?: string | null
  phone?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface MedicalPersonnelFormValues {
  identity_number?: string | null
  name?: string | null
  personnel_type?: string | null
  profession_id?: number | null
  license_number?: string | null
  phone?: string | null
  is_active?: boolean | null
}
