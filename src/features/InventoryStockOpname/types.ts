export interface InventoryStockOpname {
  id: number
  ward_id: number | null
  opname_date: string | null
  conducted_by: number | null
  notes?: string | null
  created_at?: string
  updated_at?: string
  status?: string | null
}

export interface InventoryStockOpnameFormValues {
  ward_id?: number | null
  opname_date?: string | null
  conducted_by?: number | null
  notes?: string | null
}
