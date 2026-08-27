import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Procedure } from './types'

export const GeneralProcedureEndpoint = '/procedures'

export function useProcedureResource() {
  return useCrudResource<Procedure>(GeneralProcedureEndpoint)
}
