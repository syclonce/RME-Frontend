import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PharmacyClaim } from './types'

export const BerkasKlaimPharmacyClaimEndpoint = '/pharmacy-claims'

export function usePharmacyClaimResource() {
  return useCrudResource<PharmacyClaim>(BerkasKlaimPharmacyClaimEndpoint)
}
