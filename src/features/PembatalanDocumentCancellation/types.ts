export interface PembatalanDocumentCancellation {
  id: number
  document_id: string | null
  document_type: string | null
  reason: string | null
  cancellation_date: string | null
  requested_by: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface PembatalanDocumentCancellationFormValues {
  document_id?: string | null
  document_type?: string | null
  reason?: string | null
  cancellation_date?: string | null
  requested_by?: string | null
  status?: string | null
}
