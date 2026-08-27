import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PrescriptionFulfillment } from './types'

export const LayananPrescriptionFulfillmentEndpoint = '/prescription-fulfillments'

export function usePrescriptionFulfillmentResource() {
  return useCrudResource<PrescriptionFulfillment>(LayananPrescriptionFulfillmentEndpoint)
}
