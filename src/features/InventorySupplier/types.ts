export interface Supplier {
  id: number
  code?: string | null
  name: string | null
  contact_person?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface SupplierFormValues {
  code?: string | null
  name?: string | null
  contact_person?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  is_active?: boolean | null
}
