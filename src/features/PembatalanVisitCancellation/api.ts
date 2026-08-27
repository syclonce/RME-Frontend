import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { VisitCancellation } from './types'

export const PembatalanVisitCancellationEndpoint = '/pembatalan-visit-cancellations'

export function useVisitCancellationResource() {
  return useCrudResource<VisitCancellation>(PembatalanVisitCancellationEndpoint)
}
