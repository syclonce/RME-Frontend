export interface CorporateReceivable {
  id: number
  invoice_id: number | null
  guarantor_id: number | null
  amount: number | null
  due_date: string | null
  created_at?: string
  updated_at?: string
  status?: string | null
}

export interface CorporateReceivableFormValues {
  invoice_id?: number | null
  guarantor_id?: number | null
  amount?: number | null
  due_date?: string | null
}
