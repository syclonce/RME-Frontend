export interface InventoryUnitOfMeasure {
  id: number
  name: string | null
  code?: string | null
  abbreviation?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface InventoryUnitOfMeasureFormValues {
  name?: string | null
  code?: string | null
  abbreviation?: string | null
  is_active?: boolean | null
}
