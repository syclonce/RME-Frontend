import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { NursingCarePlan } from './types'

export const MedicalRecordNursingCarePlanEndpoint = '/nursing-care-plans'

export function useNursingCarePlanResource() {
  return useCrudResource<NursingCarePlan>(MedicalRecordNursingCarePlanEndpoint)
}
