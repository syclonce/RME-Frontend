export interface ReferralType {
  id: number
  name: string | null
  code?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface ReferralTypeFormValues {
  name?: string | null
  code?: string | null
  is_active?: boolean | null
}
