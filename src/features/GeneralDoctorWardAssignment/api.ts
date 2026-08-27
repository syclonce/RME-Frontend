import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { DoctorWardAssignment } from './types'

export const GeneralDoctorWardAssignmentEndpoint = '/doctor-ward-assignments'

export function useDoctorWardAssignmentResource() {
  return useCrudResource<DoctorWardAssignment>(GeneralDoctorWardAssignmentEndpoint)
}
