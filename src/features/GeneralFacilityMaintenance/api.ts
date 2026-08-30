import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MaintenanceAsset, MaintenanceWorkOrder } from './types'

export const GeneralFacilityMaintenanceEndpoint = '/maintenance-assets'
export const MaintenanceWorkOrderEndpoint = '/work-orders'

export function useMaintenanceAssetResource() {
  return useCrudResource<MaintenanceAsset>(GeneralFacilityMaintenanceEndpoint)
}

export function useMaintenanceWorkOrderResource() {
  return useCrudResource<MaintenanceWorkOrder>(MaintenanceWorkOrderEndpoint)
}
