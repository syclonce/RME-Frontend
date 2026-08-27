import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RiskFactor } from './types'

export const MedicalRecordRiskFactorEndpoint = '/risk-factors'

export function useRiskFactorResource() {
  return useCrudResource<RiskFactor>(MedicalRecordRiskFactorEndpoint)
}
