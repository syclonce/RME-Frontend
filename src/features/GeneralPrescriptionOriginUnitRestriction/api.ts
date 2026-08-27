import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PrescriptionOriginUnitRestriction } from './types'

export const GeneralPrescriptionOriginUnitRestrictionEndpoint = '/prescription-origin-unit-restrictions'

export function usePrescriptionOriginUnitRestrictionResource() {
  return useCrudResource<PrescriptionOriginUnitRestriction>(GeneralPrescriptionOriginUnitRestrictionEndpoint)
}
