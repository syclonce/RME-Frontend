export interface InvoiceCancellation {
  id: number
  invoice_id: number | null
  reason: string | null
  created_at?: string
  updated_at?: string
  cancelled_at?: string | null
  cancelled_by?: number | null
}

export interface InvoiceCancellationFormValues {
  invoice_id?: number | null
  reason?: string | null
}
