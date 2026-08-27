import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { FormularyRestriction } from './types'

export const GeneralFormularyRestrictionEndpoint = '/formulary-restrictions'

export function useFormularyRestrictionResource() {
  return useCrudResource<FormularyRestriction>(GeneralFormularyRestrictionEndpoint)
}
