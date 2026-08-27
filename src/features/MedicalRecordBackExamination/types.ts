export interface BackExamination {
  id: number
  visit_id: number | null
  spine_alignment?: string | null
  scoliosis: boolean | null
  kyphosis: boolean | null
  lordosis: boolean | null
  tenderness: boolean | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface BackExaminationFormValues {
  visit_id?: number | null
  spine_alignment?: string | null
  scoliosis?: boolean | null
  kyphosis?: boolean | null
  lordosis?: boolean | null
  tenderness?: boolean | null
  findings?: string | null
  examined_at?: string | null
}
