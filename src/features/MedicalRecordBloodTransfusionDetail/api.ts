import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { BloodTransfusionDetail } from './types'

export const MedicalRecordBloodTransfusionDetailEndpoint = '/blood-transfusion-details'

export function useBloodTransfusionDetailResource() {
  return useCrudResource<BloodTransfusionDetail>(MedicalRecordBloodTransfusionDetailEndpoint)
}
