import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PathologyAnatomyResult } from './types'

export const LayananPathologyAnatomyResultEndpoint = '/pathology-anatomy-results'

export function usePathologyAnatomyResultResource() {
  return useCrudResource<PathologyAnatomyResult>(LayananPathologyAnatomyResultEndpoint)
}
