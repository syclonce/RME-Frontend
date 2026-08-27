export interface Payment {
  id: number
  payment_number?: string | null
  invoice_id: number | null
  payment_method: string | null
  amount: number | null
  admin_fee?: number | null
  paid_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface PaymentFormValues {
  payment_number?: string | null
  invoice_id?: number | null
  payment_method?: string | null
  amount?: number | null
  admin_fee?: number | null
  paid_at?: string | null
}
