import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { FluidBalanceAssessment } from './types'

export const MedicalRecordFluidBalanceAssessmentEndpoint = '/fluid-balance-assessments'

export function useFluidBalanceAssessmentResource() {
  return useCrudResource<FluidBalanceAssessment>(MedicalRecordFluidBalanceAssessmentEndpoint)
}
