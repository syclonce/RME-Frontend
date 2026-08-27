import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { FamilyPlanningObstetrics } from './types'

export const MedicalRecordFamilyPlanningObstetricsEndpoint = '/family-planning-obstetrics'

export function useFamilyPlanningObstetricsResource() {
  return useCrudResource<FamilyPlanningObstetrics>(MedicalRecordFamilyPlanningObstetricsEndpoint)
}
