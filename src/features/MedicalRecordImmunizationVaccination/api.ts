import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ImmunizationVaccination } from './types'

export const MedicalRecordImmunizationVaccinationEndpoint = '/immunization-vaccinations'

export function useImmunizationVaccinationResource() {
  return useCrudResource<ImmunizationVaccination>(MedicalRecordImmunizationVaccinationEndpoint)
}
