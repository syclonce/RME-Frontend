export interface LabOrder {
  id: number
  order_number?: string | null
  visit_id: number | null
  ordered_by: number | null
  ordered_at?: string | null
  destination?: string | null
  is_emergency?: boolean | null
  reason?: string | null
  notes?: string | null
  /**
   * Kolomnya ADA di database dan digerakkan LabOrderService.TRANSITIONS
   * (pending → in_progress → completed, dengan cancelled sebagai jalan keluar),
   * tapi sebelumnya hilang dari tipe ini — sehingga layar tidak dapat
   * menampilkan status order sama sekali.
   */
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface LabOrderFormValues {
  order_number?: string | null
  visit_id?: number | null
  ordered_by?: number | null
  ordered_at?: string | null
  destination?: string | null
  is_emergency?: boolean | null
  reason?: string | null
  notes?: string | null
}
