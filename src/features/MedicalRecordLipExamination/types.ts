export interface LipExamination {
  id: number
  visit_id: number | null
  color?: string | null
  symmetry?: string | null
  lesions?: string | null
  moisture?: string | null
  notes?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface LipExaminationFormValues {
  visit_id?: number | null
  color?: string | null
  symmetry?: string | null
  lesions?: string | null
  moisture?: string | null
  notes?: string | null
  examined_at?: string | null
}
