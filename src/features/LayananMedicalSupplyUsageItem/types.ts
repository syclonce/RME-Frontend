export interface MedicalSupplyUsageItem {
  id: number
  medical_supply_usage_id: number | null
  item_id: number | null
  quantity: number | null
  unit?: string | null
  created_at?: string
  updated_at?: string
}

export interface MedicalSupplyUsageItemFormValues {
  medical_supply_usage_id?: number | null
  item_id?: number | null
  quantity?: number | null
  unit?: string | null
}
