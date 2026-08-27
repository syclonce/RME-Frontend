import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { VisitCancellationReason } from './types'

export const GeneralVisitCancellationReasonEndpoint = '/visit-cancellation-reasons'

export function useVisitCancellationReasonResource() {
  return useCrudResource<VisitCancellationReason>(GeneralVisitCancellationReasonEndpoint)
}
