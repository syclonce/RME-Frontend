import { useCrudResource } from '@/shared/hooks/useCrudResource'
import type { MixturePackagingType } from './types'

export const GeneralMixturePackagingTypeEndpoint = '/mixture-packaging-types'

export function useMixturePackagingTypeResource() {
  return useCrudResource<MixturePackagingType>(GeneralMixturePackagingTypeEndpoint)
}
