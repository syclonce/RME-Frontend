import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { IcdSnomedCtMapping } from './types'

export const GeneralIcdSnomedCtMappingEndpoint = '/icd-snomed-ct-mappings'

export function useIcdSnomedCtMappingResource() {
  return useCrudResource<IcdSnomedCtMapping>(GeneralIcdSnomedCtMappingEndpoint)
}
