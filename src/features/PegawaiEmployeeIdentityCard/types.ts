export interface EmployeeIdentityCard {
  id: number
  employee_id: number | null
  id_type: string | null
  id_number: string | null
  issued_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface EmployeeIdentityCardFormValues {
  employee_id?: number | null
  id_type?: string | null
  id_number?: string | null
  issued_at?: string | null
}
