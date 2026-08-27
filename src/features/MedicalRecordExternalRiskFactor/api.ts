import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ExternalRiskFactor } from './types'

export const MedicalRecordExternalRiskFactorEndpoint = '/external-risk-factors'

export function useExternalRiskFactorResource() {
  return useCrudResource<ExternalRiskFactor>(MedicalRecordExternalRiskFactorEndpoint)
}
