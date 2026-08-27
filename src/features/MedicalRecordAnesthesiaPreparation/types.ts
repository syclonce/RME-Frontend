export interface AnesthesiaPreparation {
  id: number
  visit_id: number | null
  prepared_by: number | null
  created_by?: number | null
  fasting_hours?: number | null
  allergy_checked?: boolean | null
  mallampati_score?: number | null
  consent_confirmed?: boolean | null
  equipment_checklist?: string | null
  prepared_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface AnesthesiaPreparationFormValues {
  visit_id?: number | null
  prepared_by?: number | null
  created_by?: number | null
  fasting_hours?: number | null
  allergy_checked?: boolean | null
  mallampati_score?: number | null
  consent_confirmed?: boolean | null
  equipment_checklist?: string | null
  prepared_at?: string | null
}
