import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PrescriptionFulfillmentItem } from './types'

export const LayananPrescriptionFulfillmentItemEndpoint = '/prescription-fulfillment-items'

export function usePrescriptionFulfillmentItemResource() {
  return useCrudResource<PrescriptionFulfillmentItem>(LayananPrescriptionFulfillmentItemEndpoint)
}
