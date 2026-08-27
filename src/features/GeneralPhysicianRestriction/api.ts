import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PhysicianRestriction } from './types'

export const GeneralPhysicianRestrictionEndpoint = '/physician-restrictions'

export function usePhysicianRestrictionResource() {
  return useCrudResource<PhysicianRestriction>(GeneralPhysicianRestrictionEndpoint)
}
