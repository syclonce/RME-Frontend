import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GuarantorWardAccess } from './types'

export const GeneralGuarantorWardAccessEndpoint = '/guarantor-ward-accesses'

export function useGuarantorWardAccessResource() {
  return useCrudResource<GuarantorWardAccess>(GeneralGuarantorWardAccessEndpoint)
}
