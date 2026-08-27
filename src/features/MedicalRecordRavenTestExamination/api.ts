import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RavenTestExamination } from './types'

export const MedicalRecordRavenTestExaminationEndpoint = '/raven-test-examinations'

export function useRavenTestExaminationResource() {
  return useCrudResource<RavenTestExamination>(MedicalRecordRavenTestExaminationEndpoint)
}
