import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { NurseWardAssignment } from './types'

export const GeneralNurseWardAssignmentEndpoint = '/nurse-ward-assignments'

export function useNurseWardAssignmentResource() {
  return useCrudResource<NurseWardAssignment>(GeneralNurseWardAssignmentEndpoint)
}
