import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PlanningPeriod } from './types'

export const GeneralPlanningPeriodEndpoint = '/planning-periods'

export function usePlanningPeriodResource() {
  return useCrudResource<PlanningPeriod>(GeneralPlanningPeriodEndpoint)
}
