export interface Consultation {
  id: number
  visit_id: number | null
  requesting_department_id: number | null
  consulted_department_id: number | null
  requested_at?: string | null
  question?: string | null
  created_at?: string
  updated_at?: string
}

export interface ConsultationFormValues {
  visit_id?: number | null
  requesting_department_id?: number | null
  consulted_department_id?: number | null
  requested_at?: string | null
  question?: string | null
}
