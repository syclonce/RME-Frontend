export interface VitalSign {
  id: number
  visit_id: number | null
  recorded_at?: string | null
  temperature?: number | null
  pulse?: number | null
  respiratory_rate?: number | null
  systolic?: number | null
  diastolic?: number | null
  oxygen_saturation?: number | null
  pain_scale?: number | null
  recorded_by: number | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
}

export interface VitalSignFormValues {
  visit_id?: number | null
  recorded_at?: string | null
  temperature?: number | null
  pulse?: number | null
  respiratory_rate?: number | null
  systolic?: number | null
  diastolic?: number | null
  oxygen_saturation?: number | null
  pain_scale?: number | null
  recorded_by?: number | null
}
