export interface DischargeSummary {
  id: number
  visit_id: number | null
  admission_diagnosis_id?: number | null
  discharge_diagnosis_id?: number | null
  treatment_summary?: string | null
  condition_at_discharge?: string | null
  follow_up_plan?: string | null
  discharge_medication?: string | null
  authored_by: number | null
  authored_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface DischargeSummaryFormValues {
  visit_id?: number | null
  admission_diagnosis_id?: number | null
  discharge_diagnosis_id?: number | null
  treatment_summary?: string | null
  condition_at_discharge?: string | null
  follow_up_plan?: string | null
  discharge_medication?: string | null
  authored_by?: number | null
  authored_at?: string | null
}
