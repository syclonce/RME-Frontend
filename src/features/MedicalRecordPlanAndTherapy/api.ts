import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PlanAndTherapy } from './types'

export const MedicalRecordPlanAndTherapyEndpoint = '/plan-and-therapies'

export function usePlanAndTherapyResource() {
  return useCrudResource<PlanAndTherapy>(MedicalRecordPlanAndTherapyEndpoint)
}
