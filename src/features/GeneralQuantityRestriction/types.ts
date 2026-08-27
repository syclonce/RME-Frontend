export interface QuantityRestriction {
  id: number
  drug_name: string | null
  max_quantity_per_prescription: number | null
  unit: string | null
  notes?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface QuantityRestrictionFormValues {
  drug_name?: string | null
  max_quantity_per_prescription?: number | null
  unit?: string | null
  notes?: string | null
  is_active?: boolean | null
}
