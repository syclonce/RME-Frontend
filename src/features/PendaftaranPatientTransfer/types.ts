export interface PatientTransfer {
  id: number
  visit_id: number | null
  from_ward_id: number | null
  to_ward_id: number | null
  transferred_at?: string | null
  reason?: string | null
  created_at?: string
  updated_at?: string
}

export interface PatientTransferFormValues {
  visit_id?: number | null
  from_ward_id?: number | null
  to_ward_id?: number | null
  transferred_at?: string | null
  reason?: string | null
}
