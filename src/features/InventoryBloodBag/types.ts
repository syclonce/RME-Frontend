export interface BloodBag {
  id: number
  bag_number: string | null
  blood_type_id: number | null
  volume_ml: number | null
  collected_at: string | null
  expires_at: string | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface BloodBagFormValues {
  bag_number?: string | null
  blood_type_id?: number | null
  volume_ml?: number | null
  collected_at?: string | null
  expires_at?: string | null
  status?: string | null
}
