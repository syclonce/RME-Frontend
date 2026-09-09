export interface Consultation {
  id: number
  visit_id: number | null
  requesting_department_id: number | null
  consulted_department_id: number | null
  requested_at?: string | null
  question?: string | null
  created_at?: string
  updated_at?: string
  status?: string | null
  answered_at?: string | null
  requested_by?: number | null
}

export interface ConsultationFormValues {
  visit_id?: number | null
  requesting_department_id?: number | null
  consulted_department_id?: number | null
  requested_at?: string | null
  question?: string | null
}
