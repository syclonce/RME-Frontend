import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AdministrationTariff } from './types'

export const GeneralAdministrationTariffEndpoint = '/administration-tariffs'

export function useAdministrationTariffResource() {
  return useCrudResource<AdministrationTariff>(GeneralAdministrationTariffEndpoint)
}
