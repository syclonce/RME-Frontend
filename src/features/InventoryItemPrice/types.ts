export interface InventoryItemPrice {
  id: number
  item_id: number | null
  price: number | null
  effective_date: string | null
  created_at?: string
  updated_at?: string
  is_active?: boolean | null
}

export interface InventoryItemPriceFormValues {
  item_id?: number | null
  price?: number | null
  effective_date?: string | null
}
