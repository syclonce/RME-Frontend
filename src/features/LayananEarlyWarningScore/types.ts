export interface VitalSignObservation {
  id: number
  visit_id: number | null
  respiratory_rate: number | null
  spo2: number | null
  systolic_bp: number | null
  pulse_rate: number | null
  consciousness_level: string | null
  temperature_celsius: number | null
  recorded_by: number | null
  recorded_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface VitalSignObservationFormValues {
  visit_id?: number | null
  respiratory_rate?: number | null
  spo2?: number | null
  systolic_bp?: number | null
  pulse_rate?: number | null
  consciousness_level?: string | null
  temperature_celsius?: number | null
  recorded_by?: number | null
  recorded_at?: string | null
}
