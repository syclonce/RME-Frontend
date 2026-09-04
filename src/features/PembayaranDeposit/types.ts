export interface Deposit {
  id: number
  visit_id: number | null
  amount: number | null
  paid_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
  deposit_number?: string | null
  received_by?: number | null
  status?: string | null
}

export interface DepositFormValues {
  visit_id?: number | null
  amount?: number | null
  paid_at?: string | null
  notes?: string | null
}
