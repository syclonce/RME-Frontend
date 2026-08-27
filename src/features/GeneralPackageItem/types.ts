export interface PackageItem {
  id: number
  package_id?: number | null
  item_id?: number | null
  quantity: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PackageItemFormValues {
  package_id?: number | null
  item_id?: number | null
  quantity?: number | null
  is_active?: boolean | null
}
