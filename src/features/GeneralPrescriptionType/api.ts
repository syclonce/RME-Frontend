import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { PrescriptionType } from './types'

export const GeneralPrescriptionTypeEndpoint = '/prescription-types'

export function usePrescriptionTypeResource() {
  return useCrudResource<PrescriptionType>(GeneralPrescriptionTypeEndpoint)
}
