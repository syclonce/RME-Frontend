export interface TelemedicineSession {
  id: number
  visit_id: number | null
  doctor_employee_id: number | null
  scheduled_at: string | null
  session_url?: string | null
  created_at?: string
  updated_at?: string
}

export interface TelemedicineSessionFormValues {
  visit_id?: number | null
  doctor_employee_id?: number | null
  scheduled_at?: string | null
  session_url?: string | null
}
