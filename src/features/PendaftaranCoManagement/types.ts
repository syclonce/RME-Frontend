export interface CoManagement {
  id: number
  visit_id: number | null
  employee_id: number | null
  started_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface CoManagementFormValues {
  visit_id?: number | null
  employee_id?: number | null
  started_at?: string | null
  notes?: string | null
}
