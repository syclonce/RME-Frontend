export interface IllnessProgressionHistory {
  id: number
  visit_id: number | null
  created_by?: number | null
  symptom_onset_date?: string | null
  progression_description: string | null
  prior_treatment?: string | null
  created_at?: string
  updated_at?: string
}

export interface IllnessProgressionHistoryFormValues {
  visit_id?: number | null
  created_by?: number | null
  symptom_onset_date?: string | null
  progression_description?: string | null
  prior_treatment?: string | null
}
