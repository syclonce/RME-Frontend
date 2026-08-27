export interface InventoryGoodsReturnItem {
  id: number
  goods_return_id: number | null
  item_id: number | null
  quantity: number | null
  unit_price?: number | null
  reason?: string | null
  created_at?: string
  updated_at?: string
}

export interface InventoryGoodsReturnItemFormValues {
  goods_return_id?: number | null
  item_id?: number | null
  quantity?: number | null
  unit_price?: number | null
  reason?: string | null
}
