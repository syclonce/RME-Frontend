import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { WardQueue } from './types'

export const PendaftaranWardQueueEndpoint = '/ward-queues'

export function useWardQueueResource() {
  return useCrudResource<WardQueue>(PendaftaranWardQueueEndpoint)
}
