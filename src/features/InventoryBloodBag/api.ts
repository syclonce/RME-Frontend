import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BloodBag } from './types'

export const InventoryBloodBagEndpoint = '/blood-bags'

export function useBloodBagResource() {
  return useCrudResource<BloodBag>(InventoryBloodBagEndpoint)
}
