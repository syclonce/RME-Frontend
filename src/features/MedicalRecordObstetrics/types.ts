export interface Obstetrics {
  id: number
  visit_id: number | null
  patient_id: number | null
  gravida?: number | null
  para?: number | null
  abortus?: number | null
  gestational_age_weeks?: number | null
  fundal_height_cm?: number | null
  fetal_heart_rate?: number | null
  fetal_presentation?: string | null
  estimated_fetal_weight?: number | null
  notes?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface ObstetricsFormValues {
  visit_id?: number | null
  patient_id?: number | null
  gravida?: number | null
  para?: number | null
  abortus?: number | null
  gestational_age_weeks?: number | null
  fundal_height_cm?: number | null
  fetal_heart_rate?: number | null
  fetal_presentation?: string | null
  estimated_fetal_weight?: number | null
  notes?: string | null
  examined_at?: string | null
}
