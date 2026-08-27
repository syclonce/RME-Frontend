import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PharmacyServiceTimeStage } from './types'

export const LayananPharmacyServiceTimeStageEndpoint = '/pharmacy-service-time-stages'

export function usePharmacyServiceTimeStageResource() {
  return useCrudResource<PharmacyServiceTimeStage>(LayananPharmacyServiceTimeStageEndpoint)
}
