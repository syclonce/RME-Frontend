import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SterilizationCycle } from './types'

export const InventorySterilizationCycleEndpoint = '/sterilization-cycles'

export function useSterilizationCycleResource() {
  return useCrudResource<SterilizationCycle>(InventorySterilizationCycleEndpoint)
}
