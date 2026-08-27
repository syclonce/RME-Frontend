import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Supplier } from './types'

export const InventorySupplierEndpoint = '/suppliers'

export function useSupplierResource() {
  return useCrudResource<Supplier>(InventorySupplierEndpoint)
}
