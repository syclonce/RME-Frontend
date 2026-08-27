export interface Referral {
  id: number
  patient_id: number | null
  direction: string | null
  facility_name: string | null
  reason?: string | null
  referred_at?: string | null
  created_at?: string
  updated_at?: string
}

export interface ReferralFormValues {
  patient_id?: number | null
  direction?: string | null
  facility_name?: string | null
  reason?: string | null
  referred_at?: string | null
}
