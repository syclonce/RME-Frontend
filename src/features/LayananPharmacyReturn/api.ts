import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PharmacyReturn } from './types'

export const LayananPharmacyReturnEndpoint = '/pharmacy-returns'

export function usePharmacyReturnResource() {
  return useCrudResource<PharmacyReturn>(LayananPharmacyReturnEndpoint)
}
