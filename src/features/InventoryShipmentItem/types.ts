export interface ShipmentItem {
  id: number
  shipment_id: number | null
  item_id: number | null
  quantity: number | null
  created_at?: string
  updated_at?: string
}

export interface ShipmentItemFormValues {
  shipment_id?: number | null
  item_id?: number | null
  quantity?: number | null
}
