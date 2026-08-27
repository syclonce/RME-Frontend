import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { StaffMember } from './types'

export const GeneralStaffMemberEndpoint = '/staff-members'

export function useStaffMemberResource() {
  return useCrudResource<StaffMember>(GeneralStaffMemberEndpoint)
}
