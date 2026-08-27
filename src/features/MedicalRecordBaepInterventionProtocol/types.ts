export interface BaepInterventionProtocol {
  id: number
  visit_id: number | null
  performed_by: number | null
  created_by?: number | null
  indication?: string | null
  stimulation_ear: string | null
  click_rate_hz?: number | null
  stimulus_intensity_db?: number | null
  wave_i_latency_ms?: number | null
  wave_iii_latency_ms?: number | null
  wave_v_latency_ms?: number | null
  interpretation?: string | null
  status?: string | null
  performed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface BaepInterventionProtocolFormValues {
  visit_id?: number | null
  performed_by?: number | null
  created_by?: number | null
  indication?: string | null
  stimulation_ear?: string | null
  click_rate_hz?: number | null
  stimulus_intensity_db?: number | null
  wave_i_latency_ms?: number | null
  wave_iii_latency_ms?: number | null
  wave_v_latency_ms?: number | null
  interpretation?: string | null
  status?: string | null
  performed_at?: string | null
}
