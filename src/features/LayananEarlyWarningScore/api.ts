import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { VitalSignObservation } from './types'

export const LayananEarlyWarningScoreEndpoint = '/vital-sign-observations'

export function useVitalSignObservationResource() {
  return useCrudResource<VitalSignObservation>(LayananEarlyWarningScoreEndpoint)
}
