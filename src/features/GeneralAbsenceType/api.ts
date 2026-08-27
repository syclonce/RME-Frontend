import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { AbsenceType } from './types'

export const GeneralAbsenceTypeEndpoint = '/absence-types'

export function useAbsenceTypeResource() {
  return useCrudResource<AbsenceType>(GeneralAbsenceTypeEndpoint)
}
