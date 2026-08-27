export interface HairExamination {
  id: number
  visit_id: number | null
  distribution?: string | null
  texture?: string | null
  color?: string | null
  hair_loss: boolean | null
  scalp_condition?: string | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface HairExaminationFormValues {
  visit_id?: number | null
  distribution?: string | null
  texture?: string | null
  color?: string | null
  hair_loss?: boolean | null
  scalp_condition?: string | null
  findings?: string | null
  examined_at?: string | null
}
