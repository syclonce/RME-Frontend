export interface OtherHistory {
  id: number
  visit_id: number | null
  recorded_by: number | null
  created_by?: number | null
  category?: string | null
  description: string | null
  recorded_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface OtherHistoryFormValues {
  visit_id?: number | null
  recorded_by?: number | null
  created_by?: number | null
  category?: string | null
  description?: string | null
  recorded_at?: string | null
}
