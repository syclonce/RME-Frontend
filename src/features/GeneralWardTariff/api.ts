import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { WardTariff } from './types'

export const GeneralWardTariffEndpoint = '/ward-tariffs'

export function useWardTariffResource() {
  return useCrudResource<WardTariff>(GeneralWardTariffEndpoint)
}
