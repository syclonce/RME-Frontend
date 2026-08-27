export interface WardService {
  id: number
  ward_id: number | null
  service_id: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface WardServiceFormValues {
  ward_id?: number | null
  service_id?: number | null
  is_active?: boolean | null
}
