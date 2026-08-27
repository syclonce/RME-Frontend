import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ServiceTariff } from './types'

export const GeneralServiceTariffEndpoint = '/service-tariffs'

export function useServiceTariffResource() {
  return useCrudResource<ServiceTariff>(GeneralServiceTariffEndpoint)
}
