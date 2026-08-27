import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PharmacyServiceTime } from './types'

export const LayananPharmacyServiceTimeEndpoint = '/pharmacy-service-times'

export function usePharmacyServiceTimeResource() {
  return useCrudResource<PharmacyServiceTime>(LayananPharmacyServiceTimeEndpoint)
}
