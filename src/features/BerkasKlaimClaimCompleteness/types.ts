export interface BerkasKlaimClaimCompleteness {
  id: number
  claim_file_id: number | null
  checklist_item: string | null
  is_complete?: boolean | null
  checked_by?: string | null
  checked_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface BerkasKlaimClaimCompletenessFormValues {
  claim_file_id?: number | null
  checklist_item?: string | null
  is_complete?: boolean | null
  checked_by?: string | null
  checked_at?: string | null
}
