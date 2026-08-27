export interface BankAccount {
  id: number
  bank_name: string | null
  account_number: string | null
  account_holder: string | null
  account_type?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface BankAccountFormValues {
  bank_name?: string | null
  account_number?: string | null
  account_holder?: string | null
  account_type?: string | null
  is_active?: boolean | null
}
