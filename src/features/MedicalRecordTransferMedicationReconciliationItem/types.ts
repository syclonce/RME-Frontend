export interface TransferMedicationReconciliationItem {
  id: number
  reconciliation_id: number | null
  drug_name: string | null
  dose?: string | null
  frequency?: string | null
  route?: string | null
  action: string | null
  reason?: string | null
  created_at?: string
  updated_at?: string
}

export interface TransferMedicationReconciliationItemFormValues {
  reconciliation_id?: number | null
  drug_name?: string | null
  dose?: string | null
  frequency?: string | null
  route?: string | null
  action?: string | null
  reason?: string | null
}
