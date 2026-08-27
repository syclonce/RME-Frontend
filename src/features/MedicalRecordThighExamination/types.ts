export interface ThighExamination {
  id: number
  visit_id: number | null
  side?: string | null
  muscle_strength?: string | null
  circumference_cm?: number | null
  swelling: boolean | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface ThighExaminationFormValues {
  visit_id?: number | null
  side?: string | null
  muscle_strength?: string | null
  circumference_cm?: number | null
  swelling?: boolean | null
  findings?: string | null
  examined_at?: string | null
}
