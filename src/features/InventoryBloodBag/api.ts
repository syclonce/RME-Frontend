import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BloodBag, CrossmatchTest } from './types'

export const InventoryBloodBagEndpoint = '/blood-bags'
export const CrossmatchTestEndpoint = '/crossmatch-tests'

export function useBloodBagResource() {
  return useCrudResource<BloodBag>(InventoryBloodBagEndpoint)
}

export function useCrossmatchTestResource() {
  return useCrudResource<CrossmatchTest>(CrossmatchTestEndpoint)
}
