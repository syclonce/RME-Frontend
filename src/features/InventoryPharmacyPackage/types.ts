export interface InventoryPharmacyPackage {
  id: number
  package_code: string | null
  name: string | null
  pharmacy_service_room_id?: number | null
  category: string | null
  price: number | null
  description?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface InventoryPharmacyPackageFormValues {
  package_code?: string | null
  name?: string | null
  pharmacy_service_room_id?: number | null
  category?: string | null
  price?: number | null
  description?: string | null
  is_active?: boolean | null
}
