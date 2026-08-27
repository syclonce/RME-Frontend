export interface OxygenUsage {
  id: number
  visit_id: number | null
  flow_rate_lpm: number | null
  method: string | null
  started_at: string | null
  ended_at?: string | null
  recorded_by?: number | null
  created_at?: string
  updated_at?: string
}

export interface OxygenUsageFormValues {
  visit_id?: number | null
  flow_rate_lpm?: number | null
  method?: string | null
  started_at?: string | null
  ended_at?: string | null
  recorded_by?: number | null
}
