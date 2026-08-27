import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GeneralOperatingRoom } from './types'

export const GeneralOperatingRoomEndpoint = '/operating-rooms'

export function useGeneralOperatingRoomResource() {
  return useCrudResource<GeneralOperatingRoom>(GeneralOperatingRoomEndpoint)
}
