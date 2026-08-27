export interface EkgExamination {
  id: number
  visit_id: number | null
  patient_id: number | null
  heart_rate_bpm?: number | null
  rhythm?: string | null
  p_wave?: string | null
  pr_interval_ms?: number | null
  qrs_duration_ms?: number | null
  st_segment?: string | null
  t_wave?: string | null
  conclusion?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface EkgExaminationFormValues {
  visit_id?: number | null
  patient_id?: number | null
  heart_rate_bpm?: number | null
  rhythm?: string | null
  p_wave?: string | null
  pr_interval_ms?: number | null
  qrs_duration_ms?: number | null
  st_segment?: string | null
  t_wave?: string | null
  conclusion?: string | null
  examined_at?: string | null
}
