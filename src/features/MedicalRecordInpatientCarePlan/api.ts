import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InpatientCarePlan } from './types'

export const MedicalRecordInpatientCarePlanEndpoint = '/inpatient-care-plans'

export function useInpatientCarePlanResource() {
  return useCrudResource<InpatientCarePlan>(MedicalRecordInpatientCarePlanEndpoint)
}
