export interface ThroatExamination {
  id: number
  visit_id: number | null
  pharynx?: string | null
  uvula?: string | null
  mucosa?: string | null
  exudate: boolean | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface ThroatExaminationFormValues {
  visit_id?: number | null
  pharynx?: string | null
  uvula?: string | null
  mucosa?: string | null
  exudate?: boolean | null
  findings?: string | null
  examined_at?: string | null
}
