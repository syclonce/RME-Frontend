export interface DepositRefund {
  id: number
  deposit_id: number | null
  refunded_amount: number | null
  created_at?: string
  updated_at?: string
  refunded_at?: string | null
  refunded_by?: number | null
}

export interface DepositRefundFormValues {
  deposit_id?: number | null
  refunded_amount?: number | null
}
