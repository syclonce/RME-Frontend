import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RadiologyResult } from './types'

export const LayananRadiologyResultEndpoint = '/radiology-results'

export function useRadiologyResultResource() {
  return useCrudResource<RadiologyResult>(LayananRadiologyResultEndpoint)
}
