import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ImplementationChecklistItem } from './types'

export const MedicalRecordImplementationChecklistItemEndpoint = '/implementation-checklist-items'

export function useImplementationChecklistItemResource() {
  return useCrudResource<ImplementationChecklistItem>(MedicalRecordImplementationChecklistItemEndpoint)
}
