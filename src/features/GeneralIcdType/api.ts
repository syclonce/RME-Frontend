import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { IcdType } from './types'

export const GeneralIcdTypeEndpoint = '/icd-types'

export function useIcdTypeResource() {
  return useCrudResource<IcdType>(GeneralIcdTypeEndpoint)
}
