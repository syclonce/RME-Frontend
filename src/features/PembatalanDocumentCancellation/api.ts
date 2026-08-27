import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PembatalanDocumentCancellation } from './types'

export const PembatalanDocumentCancellationEndpoint = '/document-cancellations'

export function usePembatalanDocumentCancellationResource() {
  return useCrudResource<PembatalanDocumentCancellation>(PembatalanDocumentCancellationEndpoint)
}
