export interface CorporateReceivableSettlement {
  id: number
  corporate_receivable_id: number | null
  paid_amount: number | null
  paid_at?: string | null
  created_at?: string
  updated_at?: string
  received_by?: number | null
}

export interface CorporateReceivableSettlementFormValues {
  corporate_receivable_id?: number | null
  paid_amount?: number | null
  paid_at?: string | null
}
