import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BloodTransfusionObservation } from './types'

export const MedicalRecordBloodTransfusionObservationEndpoint = '/blood-transfusion-observations'

export function useBloodTransfusionObservationResource() {
  return useCrudResource<BloodTransfusionObservation>(MedicalRecordBloodTransfusionObservationEndpoint)
}
