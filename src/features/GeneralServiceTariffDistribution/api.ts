import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ServiceTariffDistribution } from './types'

export const GeneralServiceTariffDistributionEndpoint = '/service-tariff-distributions'

export function useServiceTariffDistributionResource() {
  return useCrudResource<ServiceTariffDistribution>(GeneralServiceTariffDistributionEndpoint)
}
