import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MchatAssessmentExamination } from './types'

export const MedicalRecordMchatAssessmentExaminationEndpoint = '/mchat-assessment-examinations'

export function useMchatAssessmentExaminationResource() {
  return useCrudResource<MchatAssessmentExamination>(MedicalRecordMchatAssessmentExaminationEndpoint)
}
