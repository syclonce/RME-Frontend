export interface CashierTransaction {
  id: number
  cashier_id: number | null
  invoice_id: number | null
  amount: number | null
  transaction_type: string | null
  transacted_at?: string | null
  created_at?: string
  updated_at?: string
  cashier_shift_id?: number | null
}

export interface CashierTransactionFormValues {
  cashier_id?: number | null
  invoice_id?: number | null
  amount?: number | null
  transaction_type?: string | null
  transacted_at?: string | null
}
