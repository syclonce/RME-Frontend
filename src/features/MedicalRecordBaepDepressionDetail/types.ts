export interface BaepDepressionDetail {
  id: number
  baep_protocol_id: number | null
  scale_used?: string | null
  score: number | null
  severity_level?: string | null
  symptoms_observed?: string | null
  created_at?: string
  updated_at?: string
}

export interface BaepDepressionDetailFormValues {
  baep_protocol_id?: number | null
  scale_used?: string | null
  score?: number | null
  severity_level?: string | null
  symptoms_observed?: string | null
}
