import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PharmacyServiceRoom } from './types'

export const GeneralPharmacyServiceRoomEndpoint = '/pharmacy-service-rooms'

export function usePharmacyServiceRoomResource() {
  return useCrudResource<PharmacyServiceRoom>(GeneralPharmacyServiceRoomEndpoint)
}
