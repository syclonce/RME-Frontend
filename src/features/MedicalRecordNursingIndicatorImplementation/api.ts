import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { NursingIndicatorImplementation } from './types'

export const MedicalRecordNursingIndicatorImplementationEndpoint = '/nursing-indicator-implementations'

export function useNursingIndicatorImplementationResource() {
  return useCrudResource<NursingIndicatorImplementation>(MedicalRecordNursingIndicatorImplementationEndpoint)
}
