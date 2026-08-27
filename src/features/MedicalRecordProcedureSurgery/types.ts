export interface ProcedureSurgery {
  id: number
  visit_id: number | null
  procedure_id?: number | null
  surgery_name: string | null
  surgery_type?: string | null
  anesthesia_type?: string | null
  performed_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface ProcedureSurgeryFormValues {
  visit_id?: number | null
  procedure_id?: number | null
  surgery_name?: string | null
  surgery_type?: string | null
  anesthesia_type?: string | null
  performed_at?: string | null
  notes?: string | null
}
