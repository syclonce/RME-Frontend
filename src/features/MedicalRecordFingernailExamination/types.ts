export interface FingernailExamination {
  id: number
  visit_id: number | null
  color?: string | null
  capillary_refill_seconds?: number | null
  clubbing: boolean | null
  cyanosis: boolean | null
  lesions?: string | null
  findings?: string | null
  examined_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface FingernailExaminationFormValues {
  visit_id?: number | null
  color?: string | null
  capillary_refill_seconds?: number | null
  clubbing?: boolean | null
  cyanosis?: boolean | null
  lesions?: string | null
  findings?: string | null
  examined_at?: string | null
}
