import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PackageTariffDistribution } from './types'

export const GeneralPackageTariffDistributionEndpoint = '/package-tariff-distributions'

export function usePackageTariffDistributionResource() {
  return useCrudResource<PackageTariffDistribution>(GeneralPackageTariffDistributionEndpoint)
}
