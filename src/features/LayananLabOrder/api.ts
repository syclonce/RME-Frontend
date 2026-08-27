import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabOrder } from './types'

export const LayananLabOrderEndpoint = '/lab-orders'

export function useLabOrderResource() {
  return useCrudResource<LabOrder>(LayananLabOrderEndpoint)
}
