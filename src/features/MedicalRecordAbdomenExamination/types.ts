export interface AbdomenExamination {
  id: number
  visit_id: number | null
  inspection?: string | null
  auscultation_bowel_sounds?: string | null
  palpation?: string | null
  percussion?: string | null
  tenderness: boolean | null
  distension: boolean | null
  liver_span_cm?: number | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface AbdomenExaminationFormValues {
  visit_id?: number | null
  inspection?: string | null
  auscultation_bowel_sounds?: string | null
  palpation?: string | null
  percussion?: string | null
  tenderness?: boolean | null
  distension?: boolean | null
  liver_span_cm?: number | null
  findings?: string | null
  examined_at?: string | null
}
