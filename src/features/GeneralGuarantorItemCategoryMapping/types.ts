export interface GuarantorItemCategoryMapping {
  id: number
  guarantor_id: number | null
  item_category_id: number | null
  is_covered?: boolean | null
  coverage_percentage?: number | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface GuarantorItemCategoryMappingFormValues {
  guarantor_id?: number | null
  item_category_id?: number | null
  is_covered?: boolean | null
  coverage_percentage?: number | null
  notes?: string | null
}
