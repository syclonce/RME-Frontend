import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { FacilityOwnershipType } from './types'

export const GeneralFacilityOwnershipTypeEndpoint = '/facility-ownership-types'

export function useFacilityOwnershipTypeResource() {
  return useCrudResource<FacilityOwnershipType>(GeneralFacilityOwnershipTypeEndpoint)
}
