import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PathologyClaimItem } from './types'

export const BerkasKlaimPathologyClaimItemEndpoint = '/pathology-claim-items'

export function usePathologyClaimItemResource() {
  return useCrudResource<PathologyClaimItem>(BerkasKlaimPathologyClaimItemEndpoint)
}
