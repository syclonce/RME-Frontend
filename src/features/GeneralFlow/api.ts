import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Flow } from './types'

export const GeneralFlowEndpoint = '/flows'

export function useFlowResource() {
  return useCrudResource<Flow>(GeneralFlowEndpoint)
}
