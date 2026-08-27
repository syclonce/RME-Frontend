import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { EndOfLifePsychosocialRelationship } from './types'

export const MedicalRecordEndOfLifePsychosocialRelationshipEndpoint = '/eol-psychosocial-relationships'

export function useEndOfLifePsychosocialRelationshipResource() {
  return useCrudResource<EndOfLifePsychosocialRelationship>(MedicalRecordEndOfLifePsychosocialRelationshipEndpoint)
}
