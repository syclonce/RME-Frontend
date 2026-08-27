import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DischargePlanningRiskFactor } from './types'

export const MedicalRecordDischargePlanningRiskFactorEndpoint = '/discharge-planning-risk-factors'

export function useDischargePlanningRiskFactorResource() {
  return useCrudResource<DischargePlanningRiskFactor>(MedicalRecordDischargePlanningRiskFactorEndpoint)
}
