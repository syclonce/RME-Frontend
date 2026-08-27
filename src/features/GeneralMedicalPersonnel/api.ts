import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MedicalPersonnel } from './types'

export const GeneralMedicalPersonnelEndpoint = '/medical-personnel'

export function useMedicalPersonnelResource() {
  return useCrudResource<MedicalPersonnel>(GeneralMedicalPersonnelEndpoint)
}
