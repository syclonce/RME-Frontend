import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ExaminationType } from './types'

export const MedicalRecordExaminationTypeEndpoint = '/examination-types'

export function useExaminationTypeResource() {
  return useCrudResource<ExaminationType>(MedicalRecordExaminationTypeEndpoint)
}
