export interface PracticeLicense {
  id: number
  employee_id: number | null
  license_type: string | null
  license_number: string | null
  issued_at?: string | null
  expires_at?: string | null
  issuing_authority?: string | null
  created_at?: string
  updated_at?: string
}

export interface PracticeLicenseFormValues {
  employee_id?: number | null
  license_type?: string | null
  license_number?: string | null
  issued_at?: string | null
  expires_at?: string | null
  issuing_authority?: string | null
}
