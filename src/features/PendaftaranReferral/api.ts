import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Referral } from './types'

export const PendaftaranReferralEndpoint = '/referrals'

export function useReferralResource() {
  return useCrudResource<Referral>(PendaftaranReferralEndpoint)
}
