import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MedicalDepartmentWardAssignment } from './types'

export const GeneralMedicalDepartmentWardAssignmentEndpoint = '/medical-department-ward-assignments'

export function useMedicalDepartmentWardAssignmentResource() {
  return useCrudResource<MedicalDepartmentWardAssignment>(GeneralMedicalDepartmentWardAssignmentEndpoint)
}
