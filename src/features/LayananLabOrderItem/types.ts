export interface LabOrderItem {
  id: number
  lab_order_id: number | null
  examination_name: string | null
  item_id?: number | null
  price?: number | null
  created_at?: string
  updated_at?: string
}

export interface LabOrderItemFormValues {
  lab_order_id?: number | null
  examination_name?: string | null
  item_id?: number | null
  price?: number | null
}
