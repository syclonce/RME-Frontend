export interface PatientReceivableSettlement {
  id: number
  patient_receivable_id: number | null
  paid_amount: number | null
  paid_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface PatientReceivableSettlementFormValues {
  patient_receivable_id?: number | null
  paid_amount?: number | null
  paid_at?: string | null
}
