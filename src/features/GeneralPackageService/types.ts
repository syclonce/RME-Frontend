export interface PackageService {
  id: number
  package_id?: number | null
  service_id?: number | null
  quantity: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PackageServiceFormValues {
  package_id?: number | null
  service_id?: number | null
  quantity?: number | null
  is_active?: boolean | null
}
