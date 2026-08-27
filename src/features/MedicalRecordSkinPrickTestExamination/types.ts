export interface SkinPrickTestExamination {
  id: number
  visit_id: number | null
  allergen: string | null
  wheal_size_mm?: number | null
  flare_size_mm?: number | null
  result?: string | null
  reaction_onset_minutes?: number | null
  notes?: string | null
  tested_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface SkinPrickTestExaminationFormValues {
  visit_id?: number | null
  allergen?: string | null
  wheal_size_mm?: number | null
  flare_size_mm?: number | null
  result?: string | null
  reaction_onset_minutes?: number | null
  notes?: string | null
  tested_at?: string | null
}
