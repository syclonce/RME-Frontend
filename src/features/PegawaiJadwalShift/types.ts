export interface ShiftSchedule {
  id: number
  staff_member_id?: number | null
  employee_id?: number | null
  ward_id?: number | null
  shift_type: string | null
  shift_date: string | null
  start_time: string | null
  end_time: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface ShiftScheduleFormValues {
  staff_member_id?: number | null
  employee_id?: number | null
  ward_id?: number | null
  shift_type?: string | null
  shift_date?: string | null
  start_time?: string | null
  end_time?: string | null
  status?: string | null
}
