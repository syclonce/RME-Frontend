export interface TongueExamination {
  id: number
  visit_id: number | null
  color?: string | null
  coating?: string | null
  moisture?: string | null
  lesions?: string | null
  movement?: string | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface TongueExaminationFormValues {
  visit_id?: number | null
  color?: string | null
  coating?: string | null
  moisture?: string | null
  lesions?: string | null
  movement?: string | null
  findings?: string | null
  examined_at?: string | null
}
