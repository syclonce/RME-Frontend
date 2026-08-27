export interface BaepMotorDetail {
  id: number
  baep_protocol_id: number | null
  muscle_strength_score?: number | null
  spasticity_level?: string | null
  gait_status?: string | null
  created_at?: string
  updated_at?: string
}

export interface BaepMotorDetailFormValues {
  baep_protocol_id?: number | null
  muscle_strength_score?: number | null
  spasticity_level?: string | null
  gait_status?: string | null
}
