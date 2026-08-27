export interface MaintenanceAsset {
  id: number
  asset_code: string | null
  asset_name: string | null
  location?: string | null
  ward_id?: number | null
  status?: string | null
  created_at?: string
  updated_at?: string
}

export interface MaintenanceAssetFormValues {
  asset_code?: string | null
  asset_name?: string | null
  location?: string | null
  ward_id?: number | null
  status?: string | null
}
