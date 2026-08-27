export interface PackageTariffDistribution {
  id: number
  package_id: number | null
  component_name: string | null
  percentage?: number | null
  amount: number | null
  is_active?: boolean | null
  created_at?: string
  updated_at?: string
}

export interface PackageTariffDistributionFormValues {
  package_id?: number | null
  component_name?: string | null
  percentage?: number | null
  amount?: number | null
  is_active?: boolean | null
}
