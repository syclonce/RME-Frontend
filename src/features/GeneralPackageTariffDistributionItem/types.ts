export interface PackageTariffDistributionItem {
  id: number
  package_tariff_distribution_id: number | null
  recipient_type: string | null
  recipient_id?: number | null
  percentage?: number | null
  amount: number | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface PackageTariffDistributionItemFormValues {
  package_tariff_distribution_id?: number | null
  recipient_type?: string | null
  recipient_id?: number | null
  percentage?: number | null
  amount?: number | null
  notes?: string | null
}
