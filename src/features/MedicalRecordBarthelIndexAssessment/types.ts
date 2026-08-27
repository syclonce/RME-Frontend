export interface BarthelIndexAssessment {
  id: number
  visit_id: number | null
  feeding?: number | null
  bathing?: number | null
  grooming?: number | null
  dressing?: number | null
  bowel_control?: number | null
  bladder_control?: number | null
  toilet_use?: number | null
  transfers?: number | null
  mobility?: number | null
  stairs?: number | null
  total_score?: number | null
  interpretation?: string | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface BarthelIndexAssessmentFormValues {
  visit_id?: number | null
  feeding?: number | null
  bathing?: number | null
  grooming?: number | null
  dressing?: number | null
  bowel_control?: number | null
  bladder_control?: number | null
  toilet_use?: number | null
  transfers?: number | null
  mobility?: number | null
  stairs?: number | null
  total_score?: number | null
  interpretation?: string | null
  assessed_at?: string | null
}
