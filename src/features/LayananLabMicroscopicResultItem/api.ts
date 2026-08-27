import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabMicroscopicResultItem } from './types'

export const LayananLabMicroscopicResultItemEndpoint = '/lab-microscopic-result-items'

export function useLabMicroscopicResultItemResource() {
  return useCrudResource<LabMicroscopicResultItem>(LayananLabMicroscopicResultItemEndpoint)
}
