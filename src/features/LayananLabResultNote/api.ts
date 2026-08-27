import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { LabResultNote } from './types'

export const LayananLabResultNoteEndpoint = '/lab-result-notes'

export function useLabResultNoteResource() {
  return useCrudResource<LabResultNote>(LayananLabResultNoteEndpoint)
}
