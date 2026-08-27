import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PharmacyClaimItem } from './types'

export const BerkasKlaimPharmacyClaimItemEndpoint = '/pharmacy-claim-items'

export function usePharmacyClaimItemResource() {
  return useCrudResource<PharmacyClaimItem>(BerkasKlaimPharmacyClaimItemEndpoint)
}
