export interface MedicalProcedure {
  id: number
  visit_id: number | null
  service_id: number | null
  performed_at?: string | null
  performed_by: number | null
  notes?: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
}

export interface MedicalProcedureFormValues {
  visit_id?: number | null
  service_id?: number | null
  performed_at?: string | null
  performed_by?: number | null
  notes?: string | null
  status?: string | null
}
