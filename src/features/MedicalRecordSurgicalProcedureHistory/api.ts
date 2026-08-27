import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SurgicalProcedureHistory } from './types'

export const MedicalRecordSurgicalProcedureHistoryEndpoint = '/surgical-procedure-histories'

export function useSurgicalProcedureHistoryResource() {
  return useCrudResource<SurgicalProcedureHistory>(MedicalRecordSurgicalProcedureHistoryEndpoint)
}
