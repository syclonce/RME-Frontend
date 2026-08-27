export interface MedicationServiceLimit {
  id: number
  item_id: number | null
  guarantor_type?: string | null
  max_quantity_per_month: number | null
  max_days_supply?: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface MedicationServiceLimitFormValues {
  item_id?: number | null
  guarantor_type?: string | null
  max_quantity_per_month?: number | null
  max_days_supply?: number | null
  is_active?: boolean | null
}
