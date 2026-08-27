export interface DischargeMedicationReconciliationItem {
  id: number
  reconciliation_id: number | null
  drug_name: string | null
  dose?: string | null
  frequency?: string | null
  route?: string | null
  action: string | null
  reason?: string | null
  patient_education_given?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface DischargeMedicationReconciliationItemFormValues {
  reconciliation_id?: number | null
  drug_name?: string | null
  dose?: string | null
  frequency?: string | null
  route?: string | null
  action?: string | null
  reason?: string | null
  patient_education_given?: boolean | null
}
