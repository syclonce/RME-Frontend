export interface TranscranialDopplerExamination {
  id: number
  visit_id: number | null
  indication?: string | null
  vessel?: string | null
  mean_velocity_cm_s?: number | null
  pulsatility_index?: number | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface TranscranialDopplerExaminationFormValues {
  visit_id?: number | null
  indication?: string | null
  vessel?: string | null
  mean_velocity_cm_s?: number | null
  pulsatility_index?: number | null
  findings?: string | null
  examined_at?: string | null
}
