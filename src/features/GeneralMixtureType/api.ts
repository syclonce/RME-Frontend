import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MixtureType } from './types'

export const GeneralMixtureTypeEndpoint = '/mixture-types'

export function useMixtureTypeResource() {
  return useCrudResource<MixtureType>(GeneralMixtureTypeEndpoint)
}
