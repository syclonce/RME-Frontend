export interface ServiceTariffDistribution {
  id: number
  service_tariff_id?: number | null
  component_id?: number | null
  amount: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface ServiceTariffDistributionFormValues {
  service_tariff_id?: number | null
  component_id?: number | null
  amount?: number | null
  is_active?: boolean | null
}
