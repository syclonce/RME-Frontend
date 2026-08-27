import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GuarantorParticipantType } from './types'

export const GeneralGuarantorParticipantTypeEndpoint = '/guarantor-participant-types'

export function useGuarantorParticipantTypeResource() {
  return useCrudResource<GuarantorParticipantType>(GeneralGuarantorParticipantTypeEndpoint)
}
