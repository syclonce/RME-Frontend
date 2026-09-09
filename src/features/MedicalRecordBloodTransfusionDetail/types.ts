export interface BloodTransfusionDetail {
  id: number
  transfusion_id: number | null
  blood_bag_number: string | null
  blood_type?: string | null
  volume_ml: number | null
  start_time?: string | null
  end_time?: string | null
  reaction_observed?: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
  created_by?: number | null
}

export interface BloodTransfusionDetailFormValues {
  transfusion_id?: number | null
  blood_bag_number?: string | null
  blood_type?: string | null
  volume_ml?: number | null
  start_time?: string | null
  end_time?: string | null
  reaction_observed?: string | null
  status?: string | null
}
