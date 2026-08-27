import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ClinicalNoteCoManagement } from './types'

export const MedicalRecordClinicalNoteCoManagementEndpoint = '/clinical-note-co-managements'

export function useClinicalNoteCoManagementResource() {
  return useCrudResource<ClinicalNoteCoManagement>(MedicalRecordClinicalNoteCoManagementEndpoint)
}
