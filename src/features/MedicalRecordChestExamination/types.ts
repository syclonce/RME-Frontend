export interface ChestExamination {
  id: number
  visit_id: number | null
  inspection?: string | null
  palpation?: string | null
  percussion?: string | null
  auscultation_breath_sounds?: string | null
  auscultation_heart_sounds?: string | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface ChestExaminationFormValues {
  visit_id?: number | null
  inspection?: string | null
  palpation?: string | null
  percussion?: string | null
  auscultation_breath_sounds?: string | null
  auscultation_heart_sounds?: string | null
  findings?: string | null
  examined_at?: string | null
}
