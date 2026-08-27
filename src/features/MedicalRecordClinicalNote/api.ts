import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ClinicalNote } from './types'

export const MedicalRecordClinicalNoteEndpoint = '/clinical-notes'

export function useClinicalNoteResource() {
  return useCrudResource<ClinicalNote>(MedicalRecordClinicalNoteEndpoint)
}
