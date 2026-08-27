import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { NursingImplementation } from './types'

export const MedicalRecordNursingImplementationEndpoint = '/nursing-implementations'

export function useNursingImplementationResource() {
  return useCrudResource<NursingImplementation>(MedicalRecordNursingImplementationEndpoint)
}
