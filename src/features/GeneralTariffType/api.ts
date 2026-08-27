import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TariffType } from './types'

export const GeneralTariffTypeEndpoint = '/tariff-types'

export function useTariffTypeResource() {
  return useCrudResource<TariffType>(GeneralTariffTypeEndpoint)
}
