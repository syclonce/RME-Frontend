import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RadiologyOrder } from './types'

export const LayananRadiologyOrderEndpoint = '/radiology-orders'

export function useRadiologyOrderResource() {
  return useCrudResource<RadiologyOrder>(LayananRadiologyOrderEndpoint)
}
