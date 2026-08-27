export interface RadiologyOrderItem {
  id: number
  radiology_order_id: number | null
  examination_name: string | null
  body_part?: string | null
  price?: number | null
  created_at?: string
  updated_at?: string
}

export interface RadiologyOrderItemFormValues {
  radiology_order_id?: number | null
  examination_name?: string | null
  body_part?: string | null
  price?: number | null
}
