export interface PembatalanMedicalRecordCancellation {
  id: number
  medical_record_id: string | null
  reason: string | null
  cancellation_date: string | null
  requested_by: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface PembatalanMedicalRecordCancellationFormValues {
  medical_record_id?: string | null
  reason?: string | null
  cancellation_date?: string | null
  requested_by?: string | null
  status?: string | null
}
