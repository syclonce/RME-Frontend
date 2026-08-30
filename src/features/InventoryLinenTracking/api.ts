import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LinenCycle, LinenItem } from './types'

export const InventoryLinenTrackingEndpoint = '/linen-items'
export const LinenCycleEndpoint = '/linen-cycles'

export function useLinenItemResource() {
  return useCrudResource<LinenItem>(InventoryLinenTrackingEndpoint)
}

export function useLinenCycleResource() {
  return useCrudResource<LinenCycle>(LinenCycleEndpoint)
}
