export interface PharynxExamination {
  id: number
  visit_id: number | null
  mucosa_color?: string | null
  exudate?: boolean | null
  post_nasal_drip?: boolean | null
  posterior_wall_condition?: string | null
  notes?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface PharynxExaminationFormValues {
  visit_id?: number | null
  mucosa_color?: string | null
  exudate?: boolean | null
  post_nasal_drip?: boolean | null
  posterior_wall_condition?: string | null
  notes?: string | null
  examined_at?: string | null
}
