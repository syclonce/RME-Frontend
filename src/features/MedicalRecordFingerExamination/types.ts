export interface FingerExamination {
  id: number
  visit_id: number | null
  hand_side?: string | null
  clubbing?: boolean | null
  cyanosis?: boolean | null
  capillary_refill_seconds?: number | null
  range_of_motion?: string | null
  notes?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface FingerExaminationFormValues {
  visit_id?: number | null
  hand_side?: string | null
  clubbing?: boolean | null
  cyanosis?: boolean | null
  capillary_refill_seconds?: number | null
  range_of_motion?: string | null
  notes?: string | null
  examined_at?: string | null
}
