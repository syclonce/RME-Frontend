import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PackageService } from './types'

export const GeneralPackageServiceEndpoint = '/package-services'

export function usePackageServiceResource() {
  return useCrudResource<PackageService>(GeneralPackageServiceEndpoint)
}
