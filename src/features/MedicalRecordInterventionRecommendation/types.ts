export interface InterventionRecommendation {
  id: number
  visit_id: number | null
  source?: string | null
  recommendation?: string | null
  priority?: string | null
  recommended_by: number | null
  recommended_at: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface InterventionRecommendationFormValues {
  visit_id?: number | null
  source?: string | null
  recommendation?: string | null
  priority?: string | null
  recommended_by?: number | null
  recommended_at?: string | null
  status?: string | null
}
