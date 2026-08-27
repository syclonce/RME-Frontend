import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InventoryPharmacyPackage } from './types'

export const InventoryPharmacyPackageEndpoint = '/pharmacy-packages'

export function useInventoryPharmacyPackageResource() {
  return useCrudResource<InventoryPharmacyPackage>(InventoryPharmacyPackageEndpoint)
}
