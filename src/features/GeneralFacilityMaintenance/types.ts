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

export interface MaintenanceWorkOrder {
  id: number
  asset_id: number | null
  reported_by: number | null
  issue_description: string | null
  priority?: string | null
  status?: string | null
  assigned_to?: number | null
  reported_at?: string | null
  completed_at?: string | null
  requires_manual_verification?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface MaintenanceWorkOrderFormValues {
  asset_id?: number | null
  reported_by?: number | null
  issue_description?: string | null
  priority?: string | null
  reported_at?: string | null
}
