export interface ModifiedBarthelIndexAssessment {
  id: number
  visit_id: number | null
  feeding?: number | null
  bathing?: number | null
  personal_hygiene?: number | null
  dressing?: number | null
  bowel_control?: number | null
  bladder_control?: number | null
  toilet_use?: number | null
  chair_bed_transfer?: number | null
  ambulation?: number | null
  stairs?: number | null
  total_score?: number | null
  interpretation?: string | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface ModifiedBarthelIndexAssessmentFormValues {
  visit_id?: number | null
  feeding?: number | null
  bathing?: number | null
  personal_hygiene?: number | null
  dressing?: number | null
  bowel_control?: number | null
  bladder_control?: number | null
  toilet_use?: number | null
  chair_bed_transfer?: number | null
  ambulation?: number | null
  stairs?: number | null
  total_score?: number | null
  interpretation?: string | null
  assessed_at?: string | null
}
