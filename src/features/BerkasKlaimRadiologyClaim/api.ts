import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { RadiologyClaim } from './types'

export const BerkasKlaimRadiologyClaimEndpoint = '/radiology-claims'

export function useRadiologyClaimResource() {
  return useCrudResource<RadiologyClaim>(BerkasKlaimRadiologyClaimEndpoint)
}
