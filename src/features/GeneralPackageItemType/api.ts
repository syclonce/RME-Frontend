import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PackageItemType } from './types'

export const GeneralPackageItemTypeEndpoint = '/package-item-types'

export function usePackageItemTypeResource() {
  return useCrudResource<PackageItemType>(GeneralPackageItemTypeEndpoint)
}
