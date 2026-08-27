export interface BloodRequestItem {
  id: number
  blood_transfusion_id: number | null
  blood_component: string | null
  blood_type?: string | null
  bag_quantity: number | null
  cross_match_result?: string | null
  status?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface BloodRequestItemFormValues {
  blood_transfusion_id?: number | null
  blood_component?: string | null
  blood_type?: string | null
  bag_quantity?: number | null
  cross_match_result?: string | null
  status?: string | null
  notes?: string | null
}
