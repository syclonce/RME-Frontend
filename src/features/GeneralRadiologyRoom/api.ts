import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GeneralRadiologyRoom } from './types'

export const GeneralRadiologyRoomEndpoint = '/radiology-rooms'

export function useGeneralRadiologyRoomResource() {
  return useCrudResource<GeneralRadiologyRoom>(GeneralRadiologyRoomEndpoint)
}
