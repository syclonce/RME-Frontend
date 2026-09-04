export interface QueueCall {
  id: number
  ward_queue_id: number | null
  counter: string | null
  created_at?: string
  updated_at?: string
  called_at?: string | null
  called_by?: number | null
}

export interface QueueCallFormValues {
  ward_queue_id?: number | null
  counter?: string | null
}
