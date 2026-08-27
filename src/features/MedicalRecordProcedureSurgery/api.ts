import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ProcedureSurgery } from './types'

export const MedicalRecordProcedureSurgeryEndpoint = '/procedure-surgeries'

export function useProcedureSurgeryResource() {
  return useCrudResource<ProcedureSurgery>(MedicalRecordProcedureSurgeryEndpoint)
}
