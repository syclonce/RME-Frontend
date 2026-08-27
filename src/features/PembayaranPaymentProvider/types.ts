export interface PaymentProvider {
  id: number
  provider_code?: string | null
  provider_name: string | null
  provider_type?: string | null
  merchant_id?: string | null
  api_base_url?: string | null
  contact_person?: string | null
  contact_phone?: string | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PaymentProviderFormValues {
  provider_code?: string | null
  provider_name?: string | null
  provider_type?: string | null
  merchant_id?: string | null
  api_base_url?: string | null
  contact_person?: string | null
  contact_phone?: string | null
  is_active?: boolean | null
}
