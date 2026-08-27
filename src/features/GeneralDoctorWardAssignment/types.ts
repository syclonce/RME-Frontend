export interface DoctorWardAssignment {
  id: number
  doctor_id: number | null
  ward_id: number | null
  assigned_at?: string | null
  schedule_day?: string | null
  created_at?: string
  updated_at?: string
}

export interface DoctorWardAssignmentFormValues {
  doctor_id?: number | null
  ward_id?: number | null
  assigned_at?: string | null
  schedule_day?: string | null
}
