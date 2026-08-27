import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { EmergencyEducation } from './types'

export const MedicalRecordEmergencyEducationEndpoint = '/emergency-educations'

export function useEmergencyEducationResource() {
  return useCrudResource<EmergencyEducation>(MedicalRecordEmergencyEducationEndpoint)
}
