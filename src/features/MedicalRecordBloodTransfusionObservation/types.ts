export interface BloodTransfusionObservation {
  id: number
  blood_transfusion_id: number | null
  observed_at: string | null
  temperature_c?: number | null
  pulse_rate?: number | null
  blood_pressure?: string | null
  reaction_signs?: string | null
  volume_transfused_ml?: number | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface BloodTransfusionObservationFormValues {
  blood_transfusion_id?: number | null
  observed_at?: string | null
  temperature_c?: number | null
  pulse_rate?: number | null
  blood_pressure?: string | null
  reaction_signs?: string | null
  volume_transfused_ml?: number | null
  notes?: string | null
}
