export interface Doctor {
  id: number
  employee_id: number | null
  specialization?: string | null
  sip_number?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface DoctorFormValues {
  employee_id?: number | null
  specialization?: string | null
  sip_number?: string | null
  is_active?: boolean | null
}
