export interface PainScoreAssessment {
  id: number
  visit_id: number | null
  assessed_by: number | null
  created_by?: number | null
  scale_type: string | null
  score: number | null
  location?: string | null
  character?: string | null
  notes?: string | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface PainScoreAssessmentFormValues {
  visit_id?: number | null
  assessed_by?: number | null
  created_by?: number | null
  scale_type?: string | null
  score?: number | null
  location?: string | null
  character?: string | null
  notes?: string | null
  assessed_at?: string | null
}
