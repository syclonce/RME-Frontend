import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AntibioticRestriction } from './types'

export const GeneralAntibioticRestrictionEndpoint = '/antibiotic-restrictions'

export function useAntibioticRestrictionResource() {
  return useCrudResource<AntibioticRestriction>(GeneralAntibioticRestrictionEndpoint)
}
