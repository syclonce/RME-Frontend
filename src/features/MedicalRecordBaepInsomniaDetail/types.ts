export interface BaepInsomniaDetail {
  id: number
  baep_protocol_id: number | null
  scale_used?: string | null
  score: number | null
  sleep_onset_latency_minutes?: number | null
  sleep_efficiency_percent?: number | null
  created_at?: string
  updated_at?: string
}

export interface BaepInsomniaDetailFormValues {
  baep_protocol_id?: number | null
  scale_used?: string | null
  score?: number | null
  sleep_onset_latency_minutes?: number | null
  sleep_efficiency_percent?: number | null
}
