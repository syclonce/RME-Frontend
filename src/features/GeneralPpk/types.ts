export interface Ppk {
  id: number
  code?: string | null
  bpjs_code?: string | null
  type?: number | null
  ownership?: number | null
  jpk?: number | null
  name: string | null
  class: string | null
  address: string | null
  rt?: string | null
  rw?: string | null
  postal_code?: string | null
  phone?: string | null
  fax: string | null
  region_code?: string | null
  region_name: string | null
  started_at?: string | null
  ended_at?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PpkFormValues {
  code?: string | null
  bpjs_code?: string | null
  type?: number | null
  ownership?: number | null
  jpk?: number | null
  name?: string | null
  class?: string | null
  address?: string | null
  rt?: string | null
  rw?: string | null
  postal_code?: string | null
  phone?: string | null
  fax?: string | null
  region_code?: string | null
  region_name?: string | null
  started_at?: string | null
  ended_at?: string | null
  is_active?: boolean | null
}
