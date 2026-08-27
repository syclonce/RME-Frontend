import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { OperationGroup } from './types'

export const GeneralOperationGroupEndpoint = '/operation-groups'

export function useOperationGroupResource() {
  return useCrudResource<OperationGroup>(GeneralOperationGroupEndpoint)
}
