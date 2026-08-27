import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PathologyClaim } from './types'

export const BerkasKlaimPathologyClaimEndpoint = '/pathology-claims'

export function usePathologyClaimResource() {
  return useCrudResource<PathologyClaim>(BerkasKlaimPathologyClaimEndpoint)
}
