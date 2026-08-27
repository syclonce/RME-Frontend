import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PharmacyGuarantorMargin } from './types'

export const GeneralPharmacyGuarantorMarginEndpoint = '/pharmacy-guarantor-margins'

export function usePharmacyGuarantorMarginResource() {
  return useCrudResource<PharmacyGuarantorMargin>(GeneralPharmacyGuarantorMarginEndpoint)
}
