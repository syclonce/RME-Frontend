import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Package } from './types'

export const GeneralPackageEndpoint = '/packages'

export function usePackageResource() {
  return useCrudResource<Package>(GeneralPackageEndpoint)
}
