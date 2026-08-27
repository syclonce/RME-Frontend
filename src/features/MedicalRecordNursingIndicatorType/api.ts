import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { NursingIndicatorType } from './types'

export const MedicalRecordNursingIndicatorTypeEndpoint = '/nursing-indicator-types'

export function useNursingIndicatorTypeResource() {
  return useCrudResource<NursingIndicatorType>(MedicalRecordNursingIndicatorTypeEndpoint)
}
