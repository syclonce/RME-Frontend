export interface PalateExamination {
  id: number
  visit_id: number | null
  hard_palate?: string | null
  soft_palate?: string | null
  uvula_position?: string | null
  cleft_palate: boolean | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface PalateExaminationFormValues {
  visit_id?: number | null
  hard_palate?: string | null
  soft_palate?: string | null
  uvula_position?: string | null
  cleft_palate?: boolean | null
  findings?: string | null
  examined_at?: string | null
}
