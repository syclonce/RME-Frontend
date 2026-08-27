import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { FluidBalanceAssessmentDetail } from './types'

export const MedicalRecordFluidBalanceAssessmentDetailEndpoint = '/fluid-balance-assessment-details'

export function useFluidBalanceAssessmentDetailResource() {
  return useCrudResource<FluidBalanceAssessmentDetail>(MedicalRecordFluidBalanceAssessmentDetailEndpoint)
}
