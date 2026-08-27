export interface ReceivingRecord {
  id: number
  ward_id: number | null
  received_by: number | null
  received_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface ReceivingRecordFormValues {
  ward_id?: number | null
  received_by?: number | null
  received_at?: string | null
  notes?: string | null
}
