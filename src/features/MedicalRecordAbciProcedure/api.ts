import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AbciProcedure } from './types'

export const MedicalRecordAbciProcedureEndpoint = '/abci-procedures'

export function useAbciProcedureResource() {
  return useCrudResource<AbciProcedure>(MedicalRecordAbciProcedureEndpoint)
}
