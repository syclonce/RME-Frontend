import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AntibioticBacteriaMapping } from './types'

export const GeneralAntibioticBacteriaMappingEndpoint = '/antibiotic-bacteria-mappings'

export function useAntibioticBacteriaMappingResource() {
  return useCrudResource<AntibioticBacteriaMapping>(GeneralAntibioticBacteriaMappingEndpoint)
}
