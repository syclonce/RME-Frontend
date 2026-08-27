export interface EmployeeContact {
  id: number
  employee_id: number | null
  contact_type: string | null
  value: string | null
  created_at?: string
  updated_at?: string
}

export interface EmployeeContactFormValues {
  employee_id?: number | null
  contact_type?: string | null
  value?: string | null
}
