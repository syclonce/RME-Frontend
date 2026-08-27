export interface TonsilExamination {
  id: number
  visit_id: number | null
  side?: string | null
  grade?: number | null
  color?: string | null
  exudate: boolean | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface TonsilExaminationFormValues {
  visit_id?: number | null
  side?: string | null
  grade?: number | null
  color?: string | null
  exudate?: boolean | null
  findings?: string | null
  examined_at?: string | null
}
