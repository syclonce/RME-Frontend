import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PharmacyOutpatientQueue } from './types'

export const LayananPharmacyOutpatientQueueEndpoint = '/pharmacy-outpatient-queues'

export function usePharmacyOutpatientQueueResource() {
  return useCrudResource<PharmacyOutpatientQueue>(LayananPharmacyOutpatientQueueEndpoint)
}
