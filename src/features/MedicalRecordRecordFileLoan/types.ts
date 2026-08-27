export interface RecordFileLoan {
  id: number
  patient_id: number | null
  borrower_name: string | null
  borrower_unit?: string | null
  purpose?: string | null
  loaned_at: string | null
  due_at?: string | null
  returned_at?: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface RecordFileLoanFormValues {
  patient_id?: number | null
  borrower_name?: string | null
  borrower_unit?: string | null
  purpose?: string | null
  loaned_at?: string | null
  due_at?: string | null
  returned_at?: string | null
  status?: string | null
}
