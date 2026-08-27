import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DentalExamination } from './types'

export const MedicalRecordDentalExaminationEndpoint = '/dental-examinations'

export function useDentalExaminationResource() {
  return useCrudResource<DentalExamination>(MedicalRecordDentalExaminationEndpoint)
}
