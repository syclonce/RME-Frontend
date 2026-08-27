import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { FamilyMedicalHistory } from './types'

export const MedicalRecordFamilyMedicalHistoryEndpoint = '/family-medical-histories'

export function useFamilyMedicalHistoryResource() {
  return useCrudResource<FamilyMedicalHistory>(MedicalRecordFamilyMedicalHistoryEndpoint)
}
