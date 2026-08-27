export interface BaepStimulationProtocolDetail {
  id: number
  baep_protocol_id: number | null
  stimulation_site: string | null
  stimulation_frequency_hz?: number | null
  stimulation_duration_minutes?: number | null
  intensity_ma?: number | null
  number_of_sessions?: number | null
  created_at?: string
  updated_at?: string
}

export interface BaepStimulationProtocolDetailFormValues {
  baep_protocol_id?: number | null
  stimulation_site?: string | null
  stimulation_frequency_hz?: number | null
  stimulation_duration_minutes?: number | null
  intensity_ma?: number | null
  number_of_sessions?: number | null
}
