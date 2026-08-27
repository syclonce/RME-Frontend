export interface LabResultSummary {
  id: number
  visit_id: number | null
  summarized_by: number | null
  created_by?: number | null
  overall_impression?: string | null
  summarized_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface LabResultSummaryFormValues {
  visit_id?: number | null
  summarized_by?: number | null
  created_by?: number | null
  overall_impression?: string | null
  summarized_at?: string | null
}
