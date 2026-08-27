import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ExaminationGroupMapping } from './types'

export const GeneralExaminationGroupMappingEndpoint = '/examination-group-mappings'

export function useExaminationGroupMappingResource() {
  return useCrudResource<ExaminationGroupMapping>(GeneralExaminationGroupMappingEndpoint)
}
