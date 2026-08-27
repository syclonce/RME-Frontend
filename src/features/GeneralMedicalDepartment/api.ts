import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MedicalDepartment } from './types'

export const GeneralMedicalDepartmentEndpoint = '/medical-departments'

export function useMedicalDepartmentResource() {
  return useCrudResource<MedicalDepartment>(GeneralMedicalDepartmentEndpoint)
}
