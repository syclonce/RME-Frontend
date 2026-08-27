import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Triage } from './types'

export const MedicalRecordTriageEndpoint = '/triages'

export function useTriageResource() {
  return useCrudResource<Triage>(MedicalRecordTriageEndpoint)
}
