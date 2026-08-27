import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { VisitCancellation } from './types'

export const PendaftaranVisitCancellationEndpoint = '/visitcancellations'

export function useVisitCancellationResource() {
  return useCrudResource<VisitCancellation>(PendaftaranVisitCancellationEndpoint)
}
