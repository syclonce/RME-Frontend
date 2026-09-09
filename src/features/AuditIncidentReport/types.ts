export interface IncidentReport {
  id: number
  visit_id?: number | null
  patient_id?: number | null
  incident_category: string | null
  description: string | null
  occurred_at: string | null
  reported_by: number | null
  impact_score: number | null
  probability_score: number | null
  created_at?: string
  updated_at?: string
  risk_grade?: string | null
  status?: string | null
  sla_due_at?: string | null
}

export interface IncidentReportFormValues {
  visit_id?: number | null
  patient_id?: number | null
  incident_category?: string | null
  description?: string | null
  occurred_at?: string | null
  reported_by?: number | null
  impact_score?: number | null
  probability_score?: number | null
}
