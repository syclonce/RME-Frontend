import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GeneralConsultationRoom } from './types'

export const GeneralConsultationRoomEndpoint = '/consultation-rooms'

export function useGeneralConsultationRoomResource() {
  return useCrudResource<GeneralConsultationRoom>(GeneralConsultationRoomEndpoint)
}
