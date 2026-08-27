import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { OtherServiceTariff } from './types'

export const GeneralOtherServiceTariffEndpoint = '/other-service-tariffs'

export function useOtherServiceTariffResource() {
  return useCrudResource<OtherServiceTariff>(GeneralOtherServiceTariffEndpoint)
}
