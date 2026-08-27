import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InterventionProtocolDetail } from './types'

export const MedicalRecordInterventionProtocolDetailEndpoint = '/intervention-protocol-details'

export function useInterventionProtocolDetailResource() {
  return useCrudResource<InterventionProtocolDetail>(MedicalRecordInterventionProtocolDetailEndpoint)
}
