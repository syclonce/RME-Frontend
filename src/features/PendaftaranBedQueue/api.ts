import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BedQueue } from './types'

export const PendaftaranBedQueueEndpoint = '/bed-queues'

export function useBedQueueResource() {
  return useCrudResource<BedQueue>(PendaftaranBedQueueEndpoint)
}
