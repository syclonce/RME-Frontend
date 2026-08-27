export interface LinenItem {
  id: number
  linen_item_id: number | null
  status?: string | null
  sent_at?: string | null
  quantity?: number | null
  created_at?: string
  updated_at?: string
}

export interface LinenItemFormValues {
  linen_item_id?: number | null
  status?: string | null
  sent_at?: string | null
  quantity?: number | null
}
