export interface BedQueue {
  id: number
  bed_id: number | null
  patient_id: number | null
  queue_number: number | null
  created_at?: string
  updated_at?: string
  status?: string | null
}

export interface BedQueueFormValues {
  bed_id?: number | null
  patient_id?: number | null
  queue_number?: number | null
}
