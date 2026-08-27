export interface RehabilitationProcedureExamination {
  id: number
  visit_id: number | null
  procedure_name: string | null
  therapist_id?: number | null
  diagnosis_summary?: string | null
  functional_goal?: string | null
  notes?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface RehabilitationProcedureExaminationFormValues {
  visit_id?: number | null
  procedure_name?: string | null
  therapist_id?: number | null
  diagnosis_summary?: string | null
  functional_goal?: string | null
  notes?: string | null
  examined_at?: string | null
}
