export interface WardTransferRoute {
  id: number
  from_ward_id: number | null
  to_ward_id: number | null
  requires_approval?: boolean | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface WardTransferRouteFormValues {
  from_ward_id?: number | null
  to_ward_id?: number | null
  requires_approval?: boolean | null
  is_active?: boolean | null
}
