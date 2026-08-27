import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DischargePlanningScreening } from './types'

export const MedicalRecordDischargePlanningScreeningEndpoint = '/discharge-planning-screenings'

export function useDischargePlanningScreeningResource() {
  return useCrudResource<DischargePlanningScreening>(MedicalRecordDischargePlanningScreeningEndpoint)
}
