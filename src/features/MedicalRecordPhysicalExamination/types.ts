export interface PhysicalExamination {
  id: number
  visit_id: number | null
  general_condition?: string | null
  consciousness_gcs?: string | null
  head_to_toe_notes?: string | null
  examined_by?: number | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface PhysicalExaminationFormValues {
  visit_id?: number | null
  general_condition?: string | null
  consciousness_gcs?: string | null
  head_to_toe_notes?: string | null
  examined_by?: number | null
  examined_at?: string | null
}
