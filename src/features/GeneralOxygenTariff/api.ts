import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { OxygenTariff } from './types'

export const GeneralOxygenTariffEndpoint = '/oxygen-tariffs'

export function useOxygenTariffResource() {
  return useCrudResource<OxygenTariff>(GeneralOxygenTariffEndpoint)
}
