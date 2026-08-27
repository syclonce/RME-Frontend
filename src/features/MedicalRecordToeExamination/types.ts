export interface ToeExamination {
  id: number
  visit_id: number | null
  foot_side?: string | null
  deformity?: string | null
  ulceration?: boolean | null
  capillary_refill_seconds?: number | null
  sensation_monofilament?: string | null
  notes?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface ToeExaminationFormValues {
  visit_id?: number | null
  foot_side?: string | null
  deformity?: string | null
  ulceration?: boolean | null
  capillary_refill_seconds?: number | null
  sensation_monofilament?: string | null
  notes?: string | null
  examined_at?: string | null
}
