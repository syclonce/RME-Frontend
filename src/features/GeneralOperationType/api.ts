import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { OperationType } from './types'

export const GeneralOperationTypeEndpoint = '/operation-types'

export function useOperationTypeResource() {
  return useCrudResource<OperationType>(GeneralOperationTypeEndpoint)
}
