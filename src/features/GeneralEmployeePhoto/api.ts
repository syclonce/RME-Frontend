import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { GeneralEmployeePhoto } from './types'

export const GeneralEmployeePhotoEndpoint = '/employee-photos'

export function useGeneralEmployeePhotoResource() {
  return useCrudResource<GeneralEmployeePhoto>(GeneralEmployeePhotoEndpoint)
}
