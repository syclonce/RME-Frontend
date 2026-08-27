export interface PharmacyGuarantorMargin {
  id: number
  guarantor_id: number | null
  margin_percentage: number | null
  effective_date?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PharmacyGuarantorMarginFormValues {
  guarantor_id?: number | null
  margin_percentage?: number | null
  effective_date?: string | null
  is_active?: boolean | null
}
