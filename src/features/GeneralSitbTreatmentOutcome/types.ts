export interface SitbTreatmentOutcome {
  id: number
  name: string | null
  code?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface SitbTreatmentOutcomeFormValues {
  name?: string | null
  code?: string | null
  is_active?: boolean | null
}
