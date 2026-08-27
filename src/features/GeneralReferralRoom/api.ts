import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ReferralRoom } from './types'

export const GeneralReferralRoomEndpoint = '/referral-rooms'

export function useReferralRoomResource() {
  return useCrudResource<ReferralRoom>(GeneralReferralRoomEndpoint)
}
