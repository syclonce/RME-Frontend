import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { UltrasoundGuidedProcedure } from './types'

export const MedicalRecordUltrasoundGuidedProcedureEndpoint = '/ultrasound-guided-procedures'

export function useUltrasoundGuidedProcedureResource() {
  return useCrudResource<UltrasoundGuidedProcedure>(MedicalRecordUltrasoundGuidedProcedureEndpoint)
}
