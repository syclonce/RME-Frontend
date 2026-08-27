import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabCultureResult } from './types'

export const LayananLabCultureResultEndpoint = '/lab-culture-results'

export function useLabCultureResultResource() {
  return useCrudResource<LabCultureResult>(LayananLabCultureResultEndpoint)
}
