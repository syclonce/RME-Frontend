import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BerkasKlaimClaimFile } from './types'

export const BerkasKlaimClaimFileEndpoint = '/claim-files'

export function useBerkasKlaimClaimFileResource() {
  return useCrudResource<BerkasKlaimClaimFile>(BerkasKlaimClaimFileEndpoint)
}
