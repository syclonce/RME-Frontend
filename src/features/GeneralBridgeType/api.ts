import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BridgeType } from './types'

export const GeneralBridgeTypeEndpoint = '/bridge-types'

export function useBridgeTypeResource() {
  return useCrudResource<BridgeType>(GeneralBridgeTypeEndpoint)
}
