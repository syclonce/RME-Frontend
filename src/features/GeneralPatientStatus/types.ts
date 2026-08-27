export interface PatientStatus {
  id: number
  name: string | null
  code?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PatientStatusFormValues {
  name?: string | null
  code?: string | null
  is_active?: boolean | null
}
