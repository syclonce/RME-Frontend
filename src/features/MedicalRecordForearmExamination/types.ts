export interface ForearmExamination {
  id: number
  visit_id: number | null
  side?: string | null
  muscle_strength?: string | null
  range_of_motion?: string | null
  deformity: boolean | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface ForearmExaminationFormValues {
  visit_id?: number | null
  side?: string | null
  muscle_strength?: string | null
  range_of_motion?: string | null
  deformity?: boolean | null
  findings?: string | null
  examined_at?: string | null
}
