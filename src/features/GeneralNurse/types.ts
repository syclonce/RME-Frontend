export interface Nurse {
  id: number
  employee_id: number | null
  nurse_license_number?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface NurseFormValues {
  employee_id?: number | null
  nurse_license_number?: string | null
  is_active?: boolean | null
}
