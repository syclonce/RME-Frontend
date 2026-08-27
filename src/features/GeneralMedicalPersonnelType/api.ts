import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MedicalPersonnelType } from './types'

export const GeneralMedicalPersonnelTypeEndpoint = '/medical-personnel-types'

export function useMedicalPersonnelTypeResource() {
  return useCrudResource<MedicalPersonnelType>(GeneralMedicalPersonnelTypeEndpoint)
}
