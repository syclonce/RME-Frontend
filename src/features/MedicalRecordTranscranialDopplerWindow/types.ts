export interface TranscranialDopplerWindow {
  id: number
  transcranial_doppler_examination_id: number | null
  window_site: string | null
  signal_quality?: string | null
  depth_mm?: number | null
  velocity_cm_s?: number | null
  created_at?: string
  updated_at?: string
}

export interface TranscranialDopplerWindowFormValues {
  transcranial_doppler_examination_id?: number | null
  window_site?: string | null
  signal_quality?: string | null
  depth_mm?: number | null
  velocity_cm_s?: number | null
}
