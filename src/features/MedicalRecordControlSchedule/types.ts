export interface ControlSchedule {
  id: number
  patient_id: number | null
  visit_id?: number | null
  medical_department_id?: number | null
  scheduled_date: string | null
  purpose?: string | null
  scheduled_by: number | null
  status?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface ControlScheduleFormValues {
  patient_id?: number | null
  visit_id?: number | null
  medical_department_id?: number | null
  scheduled_date?: string | null
  purpose?: string | null
  scheduled_by?: number | null
  status?: string | null
  notes?: string | null
}
