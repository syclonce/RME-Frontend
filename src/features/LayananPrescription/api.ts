import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Prescription } from './types'

export const LayananPrescriptionEndpoint = '/prescriptions'

export function usePrescriptionResource() {
  return useCrudResource<Prescription>(LayananPrescriptionEndpoint)
}
