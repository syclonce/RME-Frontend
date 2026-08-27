export interface HeadExamination {
  id: number
  visit_id: number | null
  skull_shape?: string | null
  hair_distribution?: string | null
  facial_symmetry?: string | null
  tenderness: boolean | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface HeadExaminationFormValues {
  visit_id?: number | null
  skull_shape?: string | null
  hair_distribution?: string | null
  facial_symmetry?: string | null
  tenderness?: boolean | null
  findings?: string | null
  examined_at?: string | null
}
