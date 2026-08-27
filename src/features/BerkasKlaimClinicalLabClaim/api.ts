import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ClinicalLabClaim } from './types'

export const BerkasKlaimClinicalLabClaimEndpoint = '/clinical-lab-claims'

export function useClinicalLabClaimResource() {
  return useCrudResource<ClinicalLabClaim>(BerkasKlaimClinicalLabClaimEndpoint)
}
