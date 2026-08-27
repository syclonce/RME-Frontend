export interface HandJointExamination {
  id: number
  visit_id: number | null
  joint?: string | null
  range_of_motion?: string | null
  swelling: boolean | null
  tenderness: boolean | null
  deformity?: string | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface HandJointExaminationFormValues {
  visit_id?: number | null
  joint?: string | null
  range_of_motion?: string | null
  swelling?: boolean | null
  tenderness?: boolean | null
  deformity?: string | null
  findings?: string | null
  examined_at?: string | null
}
