import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { WardTransferRoute } from './types'

export const GeneralWardTransferRouteEndpoint = '/ward-transfer-routes'

export function useWardTransferRouteResource() {
  return useCrudResource<WardTransferRoute>(GeneralWardTransferRouteEndpoint)
}
