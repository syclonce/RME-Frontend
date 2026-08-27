import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ImplementationNote } from './types'

export const MedicalRecordImplementationNoteEndpoint = '/implementation-notes'

export function useImplementationNoteResource() {
  return useCrudResource<ImplementationNote>(MedicalRecordImplementationNoteEndpoint)
}
