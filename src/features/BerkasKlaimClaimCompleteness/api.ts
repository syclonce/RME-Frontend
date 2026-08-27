import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BerkasKlaimClaimCompleteness } from './types'

export const BerkasKlaimClaimCompletenessEndpoint = '/claim-completeness'

export function useBerkasKlaimClaimCompletenessResource() {
  return useCrudResource<BerkasKlaimClaimCompleteness>(BerkasKlaimClaimCompletenessEndpoint)
}
