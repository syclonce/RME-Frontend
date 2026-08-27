import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { InterventionIndicatorMapping } from './types'

export const MedicalRecordInterventionIndicatorMappingEndpoint = '/intervention-indicator-mappings'

export function useInterventionIndicatorMappingResource() {
  return useCrudResource<InterventionIndicatorMapping>(MedicalRecordInterventionIndicatorMappingEndpoint)
}
