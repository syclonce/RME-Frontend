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

export interface CrossmatchTest {
  id: number
  blood_bag_id: number
  patient_id: number
  major_result: string
  minor_result: string
  auto_control: string
  is_compatible: boolean
  tested_by?: number | null
  tested_at?: string | null
  reserved_until?: string | null
  blood_bag_status?: string | null
}
