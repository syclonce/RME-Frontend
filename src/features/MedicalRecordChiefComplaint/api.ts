import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { ChiefComplaint } from './types'

export const MedicalRecordChiefComplaintEndpoint = '/chief-complaints'

export function useChiefComplaintResource() {
  return useCrudResource<ChiefComplaint>(MedicalRecordChiefComplaintEndpoint)
}
