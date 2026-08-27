import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GeneralWardClassAssignment } from './types'

export const GeneralWardClassAssignmentEndpoint = '/ward-class-assignments'

export function useGeneralWardClassAssignmentResource() {
  return useCrudResource<GeneralWardClassAssignment>(GeneralWardClassAssignmentEndpoint)
}
