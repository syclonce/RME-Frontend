export interface AnalExamination {
  id: number
  visit_id: number | null
  inspection?: string | null
  palpation?: string | null
  sphincter_tone?: string | null
  rectal_toucher_findings?: string | null
  ampulla_recti?: string | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface AnalExaminationFormValues {
  visit_id?: number | null
  inspection?: string | null
  palpation?: string | null
  sphincter_tone?: string | null
  rectal_toucher_findings?: string | null
  ampulla_recti?: string | null
  findings?: string | null
  examined_at?: string | null
}
