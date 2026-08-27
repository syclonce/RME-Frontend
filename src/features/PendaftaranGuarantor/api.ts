import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Guarantor } from './types'

export const PendaftaranGuarantorEndpoint = '/guarantors'

export function useGuarantorResource() {
  return useCrudResource<Guarantor>(PendaftaranGuarantorEndpoint)
}
