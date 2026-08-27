export interface KillipClassAssessment {
  id: number
  visit_id: number | null
  assessed_by: number | null
  created_by?: number | null
  killip_class: number | null
  heart_rate?: number | null
  respiratory_rate?: number | null
  rales_present?: boolean | null
  s3_gallop_present?: boolean | null
  notes?: string | null
  assessed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface KillipClassAssessmentFormValues {
  visit_id?: number | null
  assessed_by?: number | null
  created_by?: number | null
  killip_class?: number | null
  heart_rate?: number | null
  respiratory_rate?: number | null
  rales_present?: boolean | null
  s3_gallop_present?: boolean | null
  notes?: string | null
  assessed_at?: string | null
}
