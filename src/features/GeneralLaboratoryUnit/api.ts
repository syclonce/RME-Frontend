import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LaboratoryUnit } from './types'

export const GeneralLaboratoryUnitEndpoint = '/laboratory-units'

export function useLaboratoryUnitResource() {
  return useCrudResource<LaboratoryUnit>(GeneralLaboratoryUnitEndpoint)
}
