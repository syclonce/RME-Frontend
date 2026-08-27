import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PharmacyServiceFee } from './types'

export const LayananPharmacyServiceFeeEndpoint = '/pharmacy-service-fees'

export function usePharmacyServiceFeeResource() {
  return useCrudResource<PharmacyServiceFee>(LayananPharmacyServiceFeeEndpoint)
}
