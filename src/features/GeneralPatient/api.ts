import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Patient } from './types'

export const GeneralPatientEndpoint = '/patients'

export function usePatientResource() {
  return useCrudResource<Patient>(GeneralPatientEndpoint)
}
