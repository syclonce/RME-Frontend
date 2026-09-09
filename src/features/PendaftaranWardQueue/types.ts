export interface WardQueue {
  id: number
  ward_id: number | null
  queue_number: number | null
  visit_id?: number | null
  created_at?: string
  updated_at?: string
  registration_id?: number | null
  queue_date?: string | null
  called_at?: string | null
  status?: string | null
}

export interface WardQueueFormValues {
  ward_id?: number | null
  queue_number?: number | null
  visit_id?: number | null
}
