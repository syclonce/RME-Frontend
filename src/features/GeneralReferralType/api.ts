import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ReferralType } from './types'

export const GeneralReferralTypeEndpoint = '/referral-types'

export function useReferralTypeResource() {
  return useCrudResource<ReferralType>(GeneralReferralTypeEndpoint)
}
