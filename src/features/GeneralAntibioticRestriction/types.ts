export interface AntibioticRestriction {
  id: number
  antibiotic_name: string | null
  aware_category: string | null
  requires_pra_approval?: boolean | null
  restriction_condition?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface AntibioticRestrictionFormValues {
  antibiotic_name?: string | null
  aware_category?: string | null
  requires_pra_approval?: boolean | null
  restriction_condition?: string | null
  is_active?: boolean | null
}
