export interface ProviderService {
  id: number
  payment_provider_id: number | null
  service_code?: string | null
  service_name: string | null
  service_type?: string | null
  admin_fee_type?: string | null
  admin_fee_amount?: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface ProviderServiceFormValues {
  payment_provider_id?: number | null
  service_code?: string | null
  service_name?: string | null
  service_type?: string | null
  admin_fee_type?: string | null
  admin_fee_amount?: number | null
  is_active?: boolean | null
}
