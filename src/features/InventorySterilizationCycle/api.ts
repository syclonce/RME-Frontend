import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SterilizationCycle, SterilizedItem } from './types'

export const InventorySterilizationCycleEndpoint = '/sterilization-cycles'
export const SterilizedItemEndpoint = '/sterilized-items'

export function useSterilizationCycleResource() {
  return useCrudResource<SterilizationCycle>(InventorySterilizationCycleEndpoint)
}

export function useSterilizedItemResource() {
  return useCrudResource<SterilizedItem>(SterilizedItemEndpoint)
}
