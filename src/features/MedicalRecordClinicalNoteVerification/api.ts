import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ClinicalNoteVerification } from './types'

export const MedicalRecordClinicalNoteVerificationEndpoint = '/clinical-note-verifications'

export function useClinicalNoteVerificationResource() {
  return useCrudResource<ClinicalNoteVerification>(MedicalRecordClinicalNoteVerificationEndpoint)
}
