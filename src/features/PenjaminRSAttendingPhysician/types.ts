export interface PenjaminRSAttendingPhysician {
  id: number
  visit_id: number | null
  employee_id: number | null
  assigned_at?: string | null
  is_primary?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PenjaminRSAttendingPhysicianFormValues {
  visit_id?: number | null
  employee_id?: number | null
  assigned_at?: string | null
  is_primary?: boolean | null
}
