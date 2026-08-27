import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DietOrder } from './types'

export const InventoryDietOrderEndpoint = '/diet-orders'

export function useDietOrderResource() {
  return useCrudResource<DietOrder>(InventoryDietOrderEndpoint)
}
