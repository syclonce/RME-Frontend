import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PenjaminRSClaimDriver } from './types'

export const PenjaminRSClaimDriverEndpoint = '/claim-drivers'

export function usePenjaminRSClaimDriverResource() {
  return useCrudResource<PenjaminRSClaimDriver>(PenjaminRSClaimDriverEndpoint)
}
