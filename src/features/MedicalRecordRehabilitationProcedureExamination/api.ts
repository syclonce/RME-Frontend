import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RehabilitationProcedureExamination } from './types'

export const MedicalRecordRehabilitationProcedureExaminationEndpoint = '/rehab-procedure-examinations'

export function useRehabilitationProcedureExaminationResource() {
  return useCrudResource<RehabilitationProcedureExamination>(MedicalRecordRehabilitationProcedureExaminationEndpoint)
}
