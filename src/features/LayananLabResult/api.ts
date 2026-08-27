import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabResult } from './types'

export const LayananLabResultEndpoint = '/lab-results'

export function useLabResultResource() {
  return useCrudResource<LabResult>(LayananLabResultEndpoint)
}
