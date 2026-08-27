export interface InvoiceCancellation {
  id: number
  invoice_id: number | null
  reason: string | null
  created_at?: string
  updated_at?: string
}

export interface InvoiceCancellationFormValues {
  invoice_id?: number | null
  reason?: string | null
}
