import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GuarantorSubspecialty } from './types'

export const GeneralGuarantorSubspecialtyEndpoint = '/guarantor-subspecialties'

export function useGuarantorSubspecialtyResource() {
  return useCrudResource<GuarantorSubspecialty>(GeneralGuarantorSubspecialtyEndpoint)
}
