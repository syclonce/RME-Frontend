import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GeneralPatientPhoto } from './types'

export const GeneralPatientPhotoEndpoint = '/patient-photos'

export function useGeneralPatientPhotoResource() {
  return useCrudResource<GeneralPatientPhoto>(GeneralPatientPhotoEndpoint)
}
