export interface LeftoverMedicationVoucherItem {
  id: number
  leftover_medication_voucher_id: number | null
  item_id: number | null
  quantity: number | null
  unit?: string | null
  created_at?: string
  updated_at?: string
}

export interface LeftoverMedicationVoucherItemFormValues {
  leftover_medication_voucher_id?: number | null
  item_id?: number | null
  quantity?: number | null
  unit?: string | null
}
