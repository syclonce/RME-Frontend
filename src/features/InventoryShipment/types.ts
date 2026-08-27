export interface Shipment {
  id: number
  from_ward_id: number | null
  to_ward_id: number | null
  shipped_by: number | null
  shipped_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface ShipmentFormValues {
  from_ward_id?: number | null
  to_ward_id?: number | null
  shipped_by?: number | null
  shipped_at?: string | null
}
