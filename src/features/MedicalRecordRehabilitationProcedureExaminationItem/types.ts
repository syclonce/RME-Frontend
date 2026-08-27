export interface RehabilitationProcedureExaminationItem {
  id: number
  rehabilitation_procedure_examination_id: number | null
  step_name: string | null
  duration_minutes?: number | null
  result?: string | null
  sequence?: number | null
  created_at?: string
  updated_at?: string
}

export interface RehabilitationProcedureExaminationItemFormValues {
  rehabilitation_procedure_examination_id?: number | null
  step_name?: string | null
  duration_minutes?: number | null
  result?: string | null
  sequence?: number | null
}
