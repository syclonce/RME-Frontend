export interface FormularyRestriction {
  id: number
  drug_name: string | null
  formulary_category: string | null
  requires_substitution?: boolean | null
  substitution_drug_name?: string | null
  notes?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface FormularyRestrictionFormValues {
  drug_name?: string | null
  formulary_category?: string | null
  requires_substitution?: boolean | null
  substitution_drug_name?: string | null
  notes?: string | null
  is_active?: boolean | null
}
