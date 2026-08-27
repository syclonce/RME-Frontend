import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PenjaminRSAttendingPhysician } from './types'

export const PenjaminRSAttendingPhysicianEndpoint = '/attending-physicians'

export function usePenjaminRSAttendingPhysicianResource() {
  return useCrudResource<PenjaminRSAttendingPhysician>(PenjaminRSAttendingPhysicianEndpoint)
}
