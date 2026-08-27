import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PharmacyDepot } from './types'

export const GeneralPharmacyDepotEndpoint = '/pharmacy-depots'

export function usePharmacyDepotResource() {
  return useCrudResource<PharmacyDepot>(GeneralPharmacyDepotEndpoint)
}
