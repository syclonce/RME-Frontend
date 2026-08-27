import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ReferralLetter } from './types'

export const PendaftaranReferralLetterEndpoint = '/referralletters'

export function useReferralLetterResource() {
  return useCrudResource<ReferralLetter>(PendaftaranReferralLetterEndpoint)
}
