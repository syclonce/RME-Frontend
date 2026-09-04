export interface Triage {
  id: number
  visit_id: number | null
  level: number | null
  chief_complaint?: string | null
  assessed_by: number | null
  assessed_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
}

export interface TriageFormValues {
  visit_id?: number | null
  level?: number | null
  chief_complaint?: string | null
  assessed_by?: number | null
  assessed_at?: string | null
  notes?: string | null
}
