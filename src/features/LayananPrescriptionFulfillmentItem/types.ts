export interface PrescriptionFulfillmentItem {
  id: number
  prescription_fulfillment_id: number | null
  prescription_item_id: number | null
  quantity_served: number | null
  is_substituted?: boolean | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface PrescriptionFulfillmentItemFormValues {
  prescription_fulfillment_id?: number | null
  prescription_item_id?: number | null
  quantity_served?: number | null
  is_substituted?: boolean | null
  notes?: string | null
}
