export interface GeneralExamination {
  id: number
  visit_id: number | null
  general_appearance?: string | null
  consciousness_level?: string | null
  nutritional_status?: string | null
  posture?: string | null
  gait?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface GeneralExaminationFormValues {
  visit_id?: number | null
  general_appearance?: string | null
  consciousness_level?: string | null
  nutritional_status?: string | null
  posture?: string | null
  gait?: string | null
  examined_at?: string | null
}
