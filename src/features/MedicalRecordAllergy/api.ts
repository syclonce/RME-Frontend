import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Allergy } from './types'

export const MedicalRecordAllergyEndpoint = '/allergies'

export function useAllergyResource() {
  return useCrudResource<Allergy>(MedicalRecordAllergyEndpoint)
}
