import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Room } from './types'

export const GeneralRoomEndpoint = '/rooms'

export function useRoomResource() {
  return useCrudResource<Room>(GeneralRoomEndpoint)
}
