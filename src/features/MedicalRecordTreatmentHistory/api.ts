import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { TreatmentHistory } from './types'

export const MedicalRecordTreatmentHistoryEndpoint = '/treatment-histories'

export function useTreatmentHistoryResource() {
  return useCrudResource<TreatmentHistory>(MedicalRecordTreatmentHistoryEndpoint)
}
