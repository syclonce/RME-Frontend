import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InterventionProtocol } from './types'

export const MedicalRecordInterventionProtocolEndpoint = '/intervention-protocols'

export function useInterventionProtocolResource() {
  return useCrudResource<InterventionProtocol>(MedicalRecordInterventionProtocolEndpoint)
}
