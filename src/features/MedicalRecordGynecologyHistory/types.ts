export interface GynecologyHistory {
  id: number
  visit_id: number | null
  created_by?: number | null
  menarche_age?: number | null
  menstrual_cycle_pattern?: string | null
  contraception_history?: string | null
  gynecological_surgery_history?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface GynecologyHistoryFormValues {
  visit_id?: number | null
  created_by?: number | null
  menarche_age?: number | null
  menstrual_cycle_pattern?: string | null
  contraception_history?: string | null
  gynecological_surgery_history?: string | null
  notes?: string | null
}
