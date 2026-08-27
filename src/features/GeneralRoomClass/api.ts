import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RoomClass } from './types'

export const GeneralRoomClassEndpoint = '/room-classes'

export function useRoomClassResource() {
  return useCrudResource<RoomClass>(GeneralRoomClassEndpoint)
}
