import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PathologyImmunofluorescenceResult } from './types'

export const LayananPathologyImmunofluorescenceResultEndpoint = '/pathology-immunofluorescence-results'

export function usePathologyImmunofluorescenceResultResource() {
  return useCrudResource<PathologyImmunofluorescenceResult>(LayananPathologyImmunofluorescenceResultEndpoint)
}
