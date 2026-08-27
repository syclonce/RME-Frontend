export interface PatientTransferSheet {
  id: number
  visit_id: number | null
  patient_id: number | null
  from_ward_id?: number | null
  to_ward_id?: number | null
  transfer_reason?: string | null
  patient_condition?: string | null
  transferred_at?: string | null
  transferred_by?: number | null
  created_at?: string
  updated_at?: string
}

export interface PatientTransferSheetFormValues {
  visit_id?: number | null
  patient_id?: number | null
  from_ward_id?: number | null
  to_ward_id?: number | null
  transfer_reason?: string | null
  patient_condition?: string | null
  transferred_at?: string | null
  transferred_by?: number | null
}
