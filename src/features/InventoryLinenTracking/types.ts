export interface LinenItem {
  id: number
  linen_code: string
  linen_type: string
  ward_id?: number | null
  created_at?: string
  updated_at?: string
}

export interface LinenItemFormValues {
  linen_code?: string
  linen_type?: string
  ward_id?: number | null
}

export interface LinenCycle {
  id: number
  linen_item_id: number
  status?: string | null
  sent_at?: string | null
  received_at?: string | null
  quantity?: number | null
  created_at?: string
  updated_at?: string
}
