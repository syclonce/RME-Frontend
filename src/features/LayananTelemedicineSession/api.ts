import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TelemedicineSession } from './types'

export const LayananTelemedicineSessionEndpoint = '/telemedicine-sessions'

export function useTelemedicineSessionResource() {
  return useCrudResource<TelemedicineSession>(LayananTelemedicineSessionEndpoint)
}
