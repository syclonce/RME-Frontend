import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { VitalSign } from './types'

export const MedicalRecordVitalSignEndpoint = '/vital-signs'

export function useVitalSignResource() {
  return useCrudResource<VitalSign>(MedicalRecordVitalSignEndpoint)
}
