import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PembatalanReturnCancellation } from './types'

export const PembatalanReturnCancellationEndpoint = '/return-cancellations'

export function usePembatalanReturnCancellationResource() {
  return useCrudResource<PembatalanReturnCancellation>(PembatalanReturnCancellationEndpoint)
}
