export interface PathologyAnatomyResult {
  id: number
  visit_id: number | null
  patient_id: number | null
  specimen_description: string | null
  macroscopic_finding?: string | null
  microscopic_finding?: string | null
  diagnosis?: string | null
  examined_by?: number | null
  examined_at: string | null
  status: string | null
  created_at?: string
  updated_at?: string
}

export interface PathologyAnatomyResultFormValues {
  visit_id?: number | null
  patient_id?: number | null
  specimen_description?: string | null
  macroscopic_finding?: string | null
  microscopic_finding?: string | null
  diagnosis?: string | null
  examined_by?: number | null
  examined_at?: string | null
  status?: string | null
}
