export interface BaepCognitiveDetail {
  id: number
  baep_protocol_id: number | null
  scale_used?: string | null
  score: number | null
  domains_affected?: string | null
  created_at?: string
  updated_at?: string
}

export interface BaepCognitiveDetailFormValues {
  baep_protocol_id?: number | null
  scale_used?: string | null
  score?: number | null
  domains_affected?: string | null
}
