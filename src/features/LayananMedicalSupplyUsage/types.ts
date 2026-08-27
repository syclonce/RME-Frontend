export interface MedicalSupplyUsage {
  id: number
  visit_id: number | null
  recorded_by?: number | null
  used_at: string | null
  status: string | null
  created_at?: string
  updated_at?: string
}

export interface MedicalSupplyUsageFormValues {
  visit_id?: number | null
  recorded_by?: number | null
  used_at?: string | null
  status?: string | null
}
