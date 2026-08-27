import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { FamilyRelationship } from './types'

export const GeneralFamilyRelationshipEndpoint = '/family-relationships'

export function useFamilyRelationshipResource() {
  return useCrudResource<FamilyRelationship>(GeneralFamilyRelationshipEndpoint)
}
