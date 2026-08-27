import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PackageTariffDistributionItem } from './types'

export const GeneralPackageTariffDistributionItemEndpoint = '/package-tariff-distribution-items'

export function usePackageTariffDistributionItemResource() {
  return useCrudResource<PackageTariffDistributionItem>(GeneralPackageTariffDistributionItemEndpoint)
}
