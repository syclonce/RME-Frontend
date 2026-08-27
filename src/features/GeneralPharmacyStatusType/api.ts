import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PharmacyStatusType } from './types'

export const GeneralPharmacyStatusTypeEndpoint = '/pharmacy-status-types'

export function usePharmacyStatusTypeResource() {
  return useCrudResource<PharmacyStatusType>(GeneralPharmacyStatusTypeEndpoint)
}
