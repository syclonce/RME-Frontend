import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ReturnCancellationType } from './types'

export const GeneralReturnCancellationTypeEndpoint = '/return-cancellation-types'

export function useReturnCancellationTypeResource() {
  return useCrudResource<ReturnCancellationType>(GeneralReturnCancellationTypeEndpoint)
}
