import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { NursingIndicator } from './types'

export const MedicalRecordNursingIndicatorEndpoint = '/nursing-indicators'

export function useNursingIndicatorResource() {
  return useCrudResource<NursingIndicator>(MedicalRecordNursingIndicatorEndpoint)
}
