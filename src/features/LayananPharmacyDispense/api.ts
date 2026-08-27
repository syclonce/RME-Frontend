import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PharmacyDispense } from './types'

export const LayananPharmacyDispenseEndpoint = '/pharmacy-dispenses'

export function usePharmacyDispenseResource() {
  return useCrudResource<PharmacyDispense>(LayananPharmacyDispenseEndpoint)
}
