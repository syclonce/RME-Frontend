import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ReferralStatus } from './types'

export const GeneralReferralStatusEndpoint = '/referral-statuses'

export function useReferralStatusResource() {
  return useCrudResource<ReferralStatus>(GeneralReferralStatusEndpoint)
}
