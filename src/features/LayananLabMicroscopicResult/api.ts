import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabMicroscopicResult } from './types'

export const LayananLabMicroscopicResultEndpoint = '/lab-microscopic-results'

export function useLabMicroscopicResultResource() {
  return useCrudResource<LabMicroscopicResult>(LayananLabMicroscopicResultEndpoint)
}
