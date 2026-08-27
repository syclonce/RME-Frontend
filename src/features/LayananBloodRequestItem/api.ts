import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BloodRequestItem } from './types'

export const LayananBloodRequestItemEndpoint = '/blood-request-items'

export function useBloodRequestItemResource() {
  return useCrudResource<BloodRequestItem>(LayananBloodRequestItemEndpoint)
}
