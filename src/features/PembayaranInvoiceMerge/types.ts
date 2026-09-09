export interface InvoiceMerge {
  id: number
  merge_number?: string | null
  payment_id: number | null
  invoice_id: number | null
  allocated_amount: number | null
  merged_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
  merged_by?: number | null
}

export interface InvoiceMergeFormValues {
  merge_number?: string | null
  payment_id?: number | null
  invoice_id?: number | null
  allocated_amount?: number | null
  merged_at?: string | null
  notes?: string | null
}
