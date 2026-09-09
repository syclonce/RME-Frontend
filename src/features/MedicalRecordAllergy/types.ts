export interface Allergy {
  id: number
  patient_id: number | null
  category: string | null
  allergen: string | null
  reaction?: string | null
  severity?: string | null
  recorded_by: number | null
  created_at?: string
  updated_at?: string
  is_active?: boolean | null
  created_by?: number | null
}

export interface AllergyFormValues {
  patient_id?: number | null
  category?: string | null
  allergen?: string | null
  reaction?: string | null
  severity?: string | null
  recorded_by?: number | null
}
