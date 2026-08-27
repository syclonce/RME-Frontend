export interface PrintDocument {
  id: number
  document_number: string
  document_type: 'receipt' | 'karcis' | 'wristband' | 'tracer'
  ref_type: string
  ref_id: number
  payload: Record<string, unknown> | null
  issued_by: number | null
  issued_at: string | null
  created_at?: string
}
