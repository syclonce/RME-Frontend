import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ReferralCode } from './types'

export const GeneralReferralCodeEndpoint = '/referral-codes'

export function useReferralCodeResource() {
  return useCrudResource<ReferralCode>(GeneralReferralCodeEndpoint)
}
