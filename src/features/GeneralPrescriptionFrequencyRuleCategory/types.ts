export interface PrescriptionFrequencyRuleCategory {
  id: number
  prescription_frequency_rule_id: number | null
  category_name: string | null
  sort_order?: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PrescriptionFrequencyRuleCategoryFormValues {
  prescription_frequency_rule_id?: number | null
  category_name?: string | null
  sort_order?: number | null
  is_active?: boolean | null
}
