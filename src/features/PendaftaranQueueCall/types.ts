export interface QueueCall {
  id: number
  ward_queue_id: number | null
  counter: string | null
  created_at?: string
  updated_at?: string
}

export interface QueueCallFormValues {
  ward_queue_id?: number | null
  counter?: string | null
}
