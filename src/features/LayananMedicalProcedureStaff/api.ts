import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MedicalProcedureStaff } from './types'

export const LayananMedicalProcedureStaffEndpoint = '/medical-procedure-staff'

export function useMedicalProcedureStaffResource() {
  return useCrudResource<MedicalProcedureStaff>(LayananMedicalProcedureStaffEndpoint)
}
