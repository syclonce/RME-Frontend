import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AccidentGuarantorType } from './types'

export const GeneralAccidentGuarantorTypeEndpoint = '/accident-guarantor-types'

export function useAccidentGuarantorTypeResource() {
  return useCrudResource<AccidentGuarantorType>(GeneralAccidentGuarantorTypeEndpoint)
}
