export interface BloodTransfusion {
  id: number
  visit_id: number | null
  blood_type_id: number | null
  volume_ml?: number | null
  started_at?: string | null
  administered_by: number | null
  reaction_notes?: string | null
  created_at?: string
  updated_at?: string
  ended_at?: string | null
  status?: string | null
  created_by?: number | null
}

export interface BloodTransfusionFormValues {
  visit_id?: number | null
  blood_type_id?: number | null
  volume_ml?: number | null
  started_at?: string | null
  administered_by?: number | null
  reaction_notes?: string | null
}
