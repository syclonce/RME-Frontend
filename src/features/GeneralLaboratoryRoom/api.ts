import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GeneralLaboratoryRoom } from './types'

export const GeneralLaboratoryRoomEndpoint = '/laboratory-rooms'

export function useGeneralLaboratoryRoomResource() {
  return useCrudResource<GeneralLaboratoryRoom>(GeneralLaboratoryRoomEndpoint)
}
