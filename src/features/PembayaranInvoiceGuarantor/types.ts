export interface InvoiceGuarantor {
  id: number
  invoice_id: number | null
  guarantor_id: number | null
  covered_amount?: number | null
  coverage_percentage?: number | null
  verification_status?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
  sequence?: number | null
  room_class_id?: number | null
  is_class_upgrade?: boolean | null
  is_vip_upgrade?: boolean | null
  is_above_vip_upgrade?: boolean | null
  inacbg_class1_tariff?: number | null
  class_upgrade_total?: number | null
  minimum_difference?: number | null
  hospital_subsidy?: number | null
  days_upgraded?: number | null
  entitled_class_total?: number | null
  verified_by?: number | null
  verified_at?: string | null
}

export interface InvoiceGuarantorFormValues {
  invoice_id?: number | null
  guarantor_id?: number | null
  covered_amount?: number | null
  coverage_percentage?: number | null
  verification_status?: string | null
  notes?: string | null
}
