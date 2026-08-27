import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BerkasKlaimClaimCompletenessComment } from './types'

export const BerkasKlaimClaimCompletenessCommentEndpoint = '/claim-completeness-comments'

export function useBerkasKlaimClaimCompletenessCommentResource() {
  return useCrudResource<BerkasKlaimClaimCompletenessComment>(BerkasKlaimClaimCompletenessCommentEndpoint)
}
