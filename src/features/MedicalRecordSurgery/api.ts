import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Surgery } from './types'

export const MedicalRecordSurgeryEndpoint = '/surgeries'

export function useSurgeryResource() {
  return useCrudResource<Surgery>(MedicalRecordSurgeryEndpoint)
}
