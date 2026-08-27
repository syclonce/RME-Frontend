export interface ReferralCode {
  id: number
  code: string | null
  name: string | null
  category?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface ReferralCodeFormValues {
  code?: string | null
  name?: string | null
  category?: string | null
  is_active?: boolean | null
}
