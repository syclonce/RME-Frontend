export interface UltrasoundGuidedProcedure {
  id: number
  patient_id: number | null
  visit_id: number | null
  doctor_id?: number | null
  procedure_name: string | null
  target_site?: string | null
  needle_gauge?: string | null
  findings_and_outcome?: string | null
  complications?: string | null
  performed_at: string | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
}

export interface UltrasoundGuidedProcedureFormValues {
  patient_id?: number | null
  visit_id?: number | null
  doctor_id?: number | null
  procedure_name?: string | null
  target_site?: string | null
  needle_gauge?: string | null
  findings_and_outcome?: string | null
  complications?: string | null
  performed_at?: string | null
}
