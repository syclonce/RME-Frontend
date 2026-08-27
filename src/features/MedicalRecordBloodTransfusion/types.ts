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
}

export interface BloodTransfusionFormValues {
  visit_id?: number | null
  blood_type_id?: number | null
  volume_ml?: number | null
  started_at?: string | null
  administered_by?: number | null
  reaction_notes?: string | null
}
