export interface Edc {
  id: number
  payment_id: number | null
  edc_reference_number: string | null
  bank_name: string | null
  card_type: string | null
  card_last_four?: string | null
  approval_code?: string | null
  amount: number | null
  transaction_at?: string | null
  created_at?: string
  updated_at?: string
  status?: string | null
}

export interface EdcFormValues {
  payment_id?: number | null
  edc_reference_number?: string | null
  bank_name?: string | null
  card_type?: string | null
  card_last_four?: string | null
  approval_code?: string | null
  amount?: number | null
  transaction_at?: string | null
}
