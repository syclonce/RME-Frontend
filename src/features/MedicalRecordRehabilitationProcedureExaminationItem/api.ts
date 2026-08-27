import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RehabilitationProcedureExaminationItem } from './types'

export const MedicalRecordRehabilitationProcedureExaminationItemEndpoint = '/rehab-procedure-examination-items'

export function useRehabilitationProcedureExaminationItemResource() {
  return useCrudResource<RehabilitationProcedureExaminationItem>(MedicalRecordRehabilitationProcedureExaminationItemEndpoint)
}
