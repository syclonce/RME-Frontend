import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { EkgExamination } from './types'

export const MedicalRecordEkgExaminationEndpoint = '/ekg-examinations'

export function useEkgExaminationResource() {
  return useCrudResource<EkgExamination>(MedicalRecordEkgExaminationEndpoint)
}
