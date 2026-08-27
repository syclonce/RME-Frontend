import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PrescriptionItem } from './types'

export const LayananPrescriptionItemEndpoint = '/prescription-items'

export function usePrescriptionItemResource() {
  return useCrudResource<PrescriptionItem>(LayananPrescriptionItemEndpoint)
}
