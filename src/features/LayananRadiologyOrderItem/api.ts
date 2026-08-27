import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RadiologyOrderItem } from './types'

export const LayananRadiologyOrderItemEndpoint = '/radiology-order-items'

export function useRadiologyOrderItemResource() {
  return useCrudResource<RadiologyOrderItem>(LayananRadiologyOrderItemEndpoint)
}
