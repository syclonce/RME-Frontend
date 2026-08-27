export interface BaepSensoryDetail {
  id: number
  baep_protocol_id: number | null
  sensory_modality: string | null
  sensory_score?: number | null
  affected_region?: string | null
  created_at?: string
  updated_at?: string
}

export interface BaepSensoryDetailFormValues {
  baep_protocol_id?: number | null
  sensory_modality?: string | null
  sensory_score?: number | null
  affected_region?: string | null
}
