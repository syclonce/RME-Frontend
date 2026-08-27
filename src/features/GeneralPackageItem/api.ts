import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PackageItem } from './types'

export const GeneralPackageItemEndpoint = '/package-items'

export function usePackageItemResource() {
  return useCrudResource<PackageItem>(GeneralPackageItemEndpoint)
}
