export interface Surgery {
  id: number
  visit_id: number | null
  diagnosis_id?: number | null
  procedure_name: string | null
  surgeon_id: number | null
  anesthesia_type?: string | null
  started_at?: string | null
  ended_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
  status?: string | null
  created_by?: number | null
}

export interface SurgeryFormValues {
  visit_id?: number | null
  diagnosis_id?: number | null
  procedure_name?: string | null
  surgeon_id?: number | null
  anesthesia_type?: string | null
  started_at?: string | null
  ended_at?: string | null
  notes?: string | null
}
