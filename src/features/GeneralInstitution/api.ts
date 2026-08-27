import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { Institution } from './types'

export const GeneralInstitutionEndpoint = '/institutions'

export function useInstitutionResource() {
  return useCrudResource<Institution>(GeneralInstitutionEndpoint)
}
