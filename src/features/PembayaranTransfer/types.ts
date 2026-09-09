export interface Transfer {
  id: number
  payment_id: number | null
  transfer_reference_number: string | null
  source_bank_name: string | null
  destination_account_number: string | null
  destination_account_name: string | null
  amount: number | null
  transferred_at?: string | null
  proof_file_path?: string | null
  created_at?: string
  updated_at?: string
  status?: string | null
}

export interface TransferFormValues {
  payment_id?: number | null
  transfer_reference_number?: string | null
  source_bank_name?: string | null
  destination_account_number?: string | null
  destination_account_name?: string | null
  amount?: number | null
  transferred_at?: string | null
  proof_file_path?: string | null
}
