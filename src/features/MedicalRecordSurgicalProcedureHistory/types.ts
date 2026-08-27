export interface SurgicalProcedureHistory {
  id: number
  visit_id: number | null
  created_by?: number | null
  procedure_name: string | null
  procedure_date?: string | null
  facility_name?: string | null
  surgeon_name?: string | null
  complications?: string | null
  created_at?: string
  updated_at?: string
}

export interface SurgicalProcedureHistoryFormValues {
  visit_id?: number | null
  created_by?: number | null
  procedure_name?: string | null
  procedure_date?: string | null
  facility_name?: string | null
  surgeon_name?: string | null
  complications?: string | null
}
