export interface TransferMedicationReconciliation {
  id: number
  visit_id: number | null
  reconciled_by: number | null
  created_by?: number | null
  transferred_to_ward_id: number | null
  source_of_medication_list?: string | null
  notes?: string | null
  status?: string | null
  reconciled_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface TransferMedicationReconciliationFormValues {
  visit_id?: number | null
  reconciled_by?: number | null
  created_by?: number | null
  transferred_to_ward_id?: number | null
  source_of_medication_list?: string | null
  notes?: string | null
  status?: string | null
  reconciled_at?: string | null
}
