import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { NursingCarePlanImplementation } from './types'

export const MedicalRecordNursingCarePlanImplementationEndpoint = '/nursing-care-plan-implementations'

export function useNursingCarePlanImplementationResource() {
  return useCrudResource<NursingCarePlanImplementation>(MedicalRecordNursingCarePlanImplementationEndpoint)
}
