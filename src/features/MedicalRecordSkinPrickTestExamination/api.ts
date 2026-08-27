import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SkinPrickTestExamination } from './types'

export const MedicalRecordSkinPrickTestExaminationEndpoint = '/skin-prick-tests'

export function useSkinPrickTestExaminationResource() {
  return useCrudResource<SkinPrickTestExamination>(MedicalRecordSkinPrickTestExaminationEndpoint)
}
