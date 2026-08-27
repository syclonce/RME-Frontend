import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Implementation } from './types'

export const MedicalRecordImplementationEndpoint = '/implementations'

export function useImplementationResource() {
  return useCrudResource<Implementation>(MedicalRecordImplementationEndpoint)
}
