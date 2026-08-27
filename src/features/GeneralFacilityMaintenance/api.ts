import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MaintenanceAsset } from './types'

export const GeneralFacilityMaintenanceEndpoint = '/maintenance-assets'

export function useMaintenanceAssetResource() {
  return useCrudResource<MaintenanceAsset>(GeneralFacilityMaintenanceEndpoint)
}
