import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { QueueCall } from './types'

export const PendaftaranQueueCallEndpoint = '/queue-calls'

export function useQueueCallResource() {
  return useCrudResource<QueueCall>(PendaftaranQueueCallEndpoint)
}
