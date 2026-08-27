export interface Anamnesis {
  id: number
  visit_id: number | null
  present_illness_history?: string | null
  past_medical_history?: string | null
  family_medical_history?: string | null
  allergy_history?: string | null
  social_history?: string | null
  recorded_by: number | null
  recorded_at: string | null
  created_at?: string
  updated_at?: string
}

export interface AnamnesisFormValues {
  visit_id?: number | null
  present_illness_history?: string | null
  past_medical_history?: string | null
  family_medical_history?: string | null
  allergy_history?: string | null
  social_history?: string | null
  recorded_by?: number | null
  recorded_at?: string | null
}
