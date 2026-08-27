import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RadiologyClaimItem } from './types'

export const BerkasKlaimRadiologyClaimItemEndpoint = '/radiology-claim-items'

export function useRadiologyClaimItemResource() {
  return useCrudResource<RadiologyClaimItem>(BerkasKlaimRadiologyClaimItemEndpoint)
}
