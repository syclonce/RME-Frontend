export interface SaleItem {
  id: number
  sale_id: number | null
  item_id: number | null
  quantity: number | null
  unit_price: number | null
  subtotal: number | null
  created_at?: string
  updated_at?: string
}

export interface SaleItemFormValues {
  sale_id?: number | null
  item_id?: number | null
  quantity?: number | null
  unit_price?: number | null
  subtotal?: number | null
}
