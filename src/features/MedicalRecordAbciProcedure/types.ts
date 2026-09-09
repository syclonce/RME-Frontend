export interface AbciProcedure {
  id: number
  patient_id: number | null
  visit_id: number | null
  doctor_id?: number | null
  procedure_date: string | null
  indication?: string | null
  procedure_details?: string | null
  outcome?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
}

export interface AbciProcedureFormValues {
  patient_id?: number | null
  visit_id?: number | null
  doctor_id?: number | null
  procedure_date?: string | null
  indication?: string | null
  procedure_details?: string | null
  outcome?: string | null
  notes?: string | null
}
