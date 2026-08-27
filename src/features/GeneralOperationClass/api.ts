import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { OperationClass } from './types'

export const GeneralOperationClassEndpoint = '/operation-classes'

export function useOperationClassResource() {
  return useCrudResource<OperationClass>(GeneralOperationClassEndpoint)
}
