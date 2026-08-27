export interface LeftoverMedicationVoucher {
  id: number
  voucher_number: string | null
  visit_id: number | null
  patient_id: number | null
  prescription_id?: number | null
  status?: string | null
  issued_at: string | null
  redeemed_at?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface LeftoverMedicationVoucherFormValues {
  voucher_number?: string | null
  visit_id?: number | null
  patient_id?: number | null
  prescription_id?: number | null
  status?: string | null
  issued_at?: string | null
  redeemed_at?: string | null
  notes?: string | null
}
