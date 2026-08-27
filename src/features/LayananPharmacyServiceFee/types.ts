export interface PharmacyServiceFee {
  id: number
  item_id?: number | null
  fee_name: string | null
  amount: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PharmacyServiceFeeFormValues {
  item_id?: number | null
  fee_name?: string | null
  amount?: number | null
  is_active?: boolean | null
}
