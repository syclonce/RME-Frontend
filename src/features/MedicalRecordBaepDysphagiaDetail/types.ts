export interface BaepDysphagiaDetail {
  id: number
  baep_protocol_id: number | null
  swallowing_test_used?: string | null
  severity_level?: string | null
  aspiration_risk?: boolean | null
  diet_texture_recommendation?: string | null
  created_at?: string
  updated_at?: string
}

export interface BaepDysphagiaDetailFormValues {
  baep_protocol_id?: number | null
  swallowing_test_used?: string | null
  severity_level?: string | null
  aspiration_risk?: boolean | null
  diet_texture_recommendation?: string | null
}
