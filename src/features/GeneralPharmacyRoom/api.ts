import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GeneralPharmacyRoom } from './types'

export const GeneralPharmacyRoomEndpoint = '/pharmacy-rooms'

export function useGeneralPharmacyRoomResource() {
  return useCrudResource<GeneralPharmacyRoom>(GeneralPharmacyRoomEndpoint)
}
