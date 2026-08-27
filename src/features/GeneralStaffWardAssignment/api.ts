import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { StaffWardAssignment } from './types'

export const GeneralStaffWardAssignmentEndpoint = '/staff-ward-assignments'

export function useStaffWardAssignmentResource() {
  return useCrudResource<StaffWardAssignment>(GeneralStaffWardAssignmentEndpoint)
}
