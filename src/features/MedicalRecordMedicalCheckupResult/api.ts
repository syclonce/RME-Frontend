import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MedicalCheckupResult } from './types'

export const MedicalRecordMedicalCheckupResultEndpoint = '/medical-checkup-results'

export function useMedicalCheckupResultResource() {
  return useCrudResource<MedicalCheckupResult>(MedicalRecordMedicalCheckupResultEndpoint)
}
