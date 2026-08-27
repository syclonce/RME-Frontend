import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ReturnCancellationReason } from './types'

export const GeneralReturnCancellationReasonEndpoint = '/return-cancellation-reasons'

export function useReturnCancellationReasonResource() {
  return useCrudResource<ReturnCancellationReason>(GeneralReturnCancellationReasonEndpoint)
}
