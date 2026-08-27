import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BloodTransfusion } from './types'

export const MedicalRecordBloodTransfusionEndpoint = '/blood-transfusions'

export function useBloodTransfusionResource() {
  return useCrudResource<BloodTransfusion>(MedicalRecordBloodTransfusionEndpoint)
}
