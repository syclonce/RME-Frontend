export interface BaepAnxietyDetail {
  id: number
  baep_protocol_id: number | null
  scale_used?: string | null
  score: number | null
  severity_level?: string | null
  created_at?: string
  updated_at?: string
}

export interface BaepAnxietyDetailFormValues {
  baep_protocol_id?: number | null
  scale_used?: string | null
  score?: number | null
  severity_level?: string | null
}
