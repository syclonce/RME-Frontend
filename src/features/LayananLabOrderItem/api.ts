import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabOrderItem } from './types'

export const LayananLabOrderItemEndpoint = '/lab-order-items'

export function useLabOrderItemResource() {
  return useCrudResource<LabOrderItem>(LayananLabOrderItemEndpoint)
}
