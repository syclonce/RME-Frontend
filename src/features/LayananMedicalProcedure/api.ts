import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MedicalProcedure } from './types'

export const LayananMedicalProcedureEndpoint = '/medical-procedures'

export function useMedicalProcedureResource() {
  return useCrudResource<MedicalProcedure>(LayananMedicalProcedureEndpoint)
}
