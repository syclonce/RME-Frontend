export interface PharmacyOutpatientQueue {
  id: number
  prescription_id: number | null
  queue_number: string | null
  status: string | null
  called_at?: string | null
  completed_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface PharmacyOutpatientQueueFormValues {
  prescription_id?: number | null
  queue_number?: string | null
  status?: string | null
  called_at?: string | null
  completed_at?: string | null
}
