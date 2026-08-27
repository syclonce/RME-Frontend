import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ClinicalLabClaimItem } from './types'

export const BerkasKlaimClinicalLabClaimItemEndpoint = '/clinical-lab-claim-items'

export function useClinicalLabClaimItemResource() {
  return useCrudResource<ClinicalLabClaimItem>(BerkasKlaimClinicalLabClaimItemEndpoint)
}
