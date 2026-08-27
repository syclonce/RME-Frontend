import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { SurgeryPerformer } from './types'

export const MedicalRecordSurgeryPerformerEndpoint = '/surgery-performers'

export function useSurgeryPerformerResource() {
  return useCrudResource<SurgeryPerformer>(MedicalRecordSurgeryPerformerEndpoint)
}
