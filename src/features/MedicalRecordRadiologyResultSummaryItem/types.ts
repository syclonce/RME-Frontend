export interface RadiologyResultSummaryItem {
  id: number
  summary_id: number | null
  exam_name: string | null
  finding?: string | null
  impression?: string | null
  performed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface RadiologyResultSummaryItemFormValues {
  summary_id?: number | null
  exam_name?: string | null
  finding?: string | null
  impression?: string | null
  performed_at?: string | null
}
