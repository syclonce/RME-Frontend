import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RoomClassReferenceGroup } from './types'

export const GeneralRoomClassReferenceGroupEndpoint = '/room-class-reference-groups'

export function useRoomClassReferenceGroupResource() {
  return useCrudResource<RoomClassReferenceGroup>(GeneralRoomClassReferenceGroupEndpoint)
}
