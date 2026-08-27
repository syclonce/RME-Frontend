import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Doctor } from './types'

export const GeneralDoctorEndpoint = '/doctors'

export function useDoctorResource() {
  return useCrudResource<Doctor>(GeneralDoctorEndpoint)
}
