import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LinenItem } from './types'

export const InventoryLinenTrackingEndpoint = '/linen-items'

export function useLinenItemResource() {
  return useCrudResource<LinenItem>(InventoryLinenTrackingEndpoint)
}
